'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const currentYear = new Date().getFullYear();

// What valid project data looks like (used by update)
const ProjectFormSchema = z.object({
    title: z.string().trim().min(2, 'Title must be at least 2 characters.'),
    description: z.string().trim().min(10, 'Description must be at least 10 characters.'),
    type: z.enum(['opensource', 'school'], 'Choose Open Source or School.'),
    technologies: z.string().trim().min(2, 'Add at least one technology.'),
    link: z.url({ protocol: /^https?$/, error: 'Link must start with http:// or https://' }).or(z.literal('')),
});

// The create form also asks for the year
const CreateProjectSchema = ProjectFormSchema.extend({
    yearCompleted: z.coerce
        .number()
        .int('Year must be a whole number.')
        .gte(2000, 'Year must be 2000 or later.')
        .lte(currentYear, `Year cannot be greater than ${currentYear}.`),
});

// What createProject sends back to the form
export type State = {
    errors?: {
        title?: string[];
        description?: string[];
        type?: string[];
        technologies?: string[];
        link?: string[];
        yearCompleted?: string[];
    };
    message?: string | null;
};

// " Next.js , TypeScript,," → "Next.js,TypeScript" (used by create and update)
function cleanTechnologies(text: string): string {
    return text
        .split(',')
        .map((tech) => tech.trim())
        .filter((tech) => tech !== '')
        .join(',');
}

export async function createProject(prevState: State, formData: FormData): Promise<State> {
    // 1. Check the raw values against the schema
    const parsed = CreateProjectSchema.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
        type: formData.get('type'),
        technologies: formData.get('technologies'),
        link: formData.get('link'),
        yearCompleted: formData.get('yearCompleted'),
    });

    // 2. Invalid? RETURN the errors to the form (no throw)
    if (!parsed.success) {
        return {
            errors: z.flattenError(parsed.error).fieldErrors,
            message: 'Missing or invalid fields. Failed to create project.',
        };
    }

    const { title, description, type, technologies: technologiesText, link, yearCompleted } = parsed.data;
    const technologies = cleanTechnologies(technologiesText);

    // 3. Save the new project
    try {
        await sql`
            INSERT INTO projects (title, description, type, technologies, link, year_completed)
            VALUES (${title}, ${description}, ${type}, string_to_array(${technologies}, ','), ${link || null}, ${yearCompleted})
        `;
    } catch (error) {
        console.error('Database error in createProject:', error);
        return { message: 'Database Error: Failed to create project.' };
    }

    // 4. Outside try: refresh the projects page, then send the user back to it
    revalidatePath('/projects');
    redirect('/projects');
}

export async function updateProject(id: number, formData: FormData) {
    // 1. The id comes from bind, but never trust values sent from the browser
    if (!Number.isInteger(id) || id < 1) {
        throw new Error('Invalid project id.');
    }

    // 2. Collect and check the form values (same schema as createProject)
    const raw = {
        title: formData.get('title'),
        description: formData.get('description'),
        type: formData.get('type'),
        technologies: formData.get('technologies'),
        link: formData.get('link'),
    };

    const parsed = ProjectFormSchema.safeParse(raw);
    if (!parsed.success) {
        throw new Error('Invalid project input.');
    }

    const { title, description, type, technologies: technologiesText, link } = parsed.data;
    const technologies = cleanTechnologies(technologiesText);

    // 3. Change ONLY this one project (only the database call goes inside try)
    try {
        await sql`
            UPDATE projects
            SET title = ${title},
                description = ${description},
                type = ${type},
                technologies = string_to_array(${technologies}, ','),
                link = ${link || null}
            WHERE id = ${id}
        `;
    } catch (error) {
        console.error('Database error in updateProject:', error);
        throw new Error('Failed to update project. Please try again later.');
    }

    // 4. Outside try: refresh the projects page, then send the user back to it
    revalidatePath('/projects');
    redirect('/projects');
}

export async function deleteProject(id: number) {
    // 1. Never trust the id: it is sent from the browser
    if (!Number.isInteger(id) || id < 1) {
        throw new Error('Invalid project id.');
    }

    // 2. Remove ONLY this one project (only the database call goes inside try)
    try {
        await sql`DELETE FROM projects WHERE id = ${id}`;
    } catch (error) {
        console.error('Database error in deleteProject:', error);
        throw new Error('Failed to delete project. Please try again later.');
    }

    // 3. Outside try: refresh /projects AND every page under it (opensource, school)
    revalidatePath('/projects', 'layout');
}
