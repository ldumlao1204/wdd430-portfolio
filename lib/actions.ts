'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// What valid project data looks like
const ProjectFormSchema = z.object({
    title: z.string().trim().min(2, 'Title must be at least 2 characters.'),
    description: z.string().trim().min(10, 'Description must be at least 10 characters.'),
    type: z.enum(['opensource', 'school'], 'Choose Open Source or School.'),
    technologies: z.string().trim().min(2, 'Add at least one technology.'),
    link: z.url({ protocol: /^https?$/, error: 'Link must start with http:// or https://' }).or(z.literal('')),
});

// " Next.js , TypeScript,," → "Next.js,TypeScript" (used by create and update)
function cleanTechnologies(text: string): string {
    return text
        .split(',')
        .map((tech) => tech.trim())
        .filter((tech) => tech !== '')
        .join(',');
}

export async function createProject(formData: FormData) {
    // 1. Collect the raw values (untrusted: they could be missing or anything)
    const raw = {
        title: formData.get('title'),
        description: formData.get('description'),
        type: formData.get('type'),
        technologies: formData.get('technologies'),
        link: formData.get('link'),
    };

    // 2. Check them against the schema
    const parsed = ProjectFormSchema.safeParse(raw);
    if (!parsed.success) {
        throw new Error('Invalid project input.');
    }

    const { title, description, type, technologies: technologiesText, link } = parsed.data;
    const technologies = cleanTechnologies(technologiesText);

    // 3. Save the new project (only the database call goes inside try)
    try {
        await sql`
            INSERT INTO projects (title, description, type, technologies, link)
            VALUES (${title}, ${description}, ${type}, string_to_array(${technologies}, ','), ${link || null})
        `;
    } catch (error) {
        console.error('Database error in createProject:', error);
        throw new Error('Failed to create project. Please try again later.');
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
