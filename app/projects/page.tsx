import ProjectList from '@/components/ProjectList';
import { getProjects } from '@/lib/projects-db';

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <section>
            <h1 className="text-3xl font-bold mb-4">Projects Overview</h1>
            <p className="text-lg text-gray-700 mb-8">
                Here is an overview of my work. Choose Open Source or School to see each group of projects.
            </p>
            <ProjectList projects={projects} />
        </section>
    );
}

