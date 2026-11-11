import ProjectList from '@/components/ProjectList';
import { getProjects } from '@/lib/projects-db';

export default function SchoolProjectsPage() {
    const projects = getProjects('school');

    return (
        <section>
            <h1 className="text-3xl font-bold mb-4">School Projects</h1>
            <p className="text-lg text-gray-700 mb-8">
                Projects I built for my BYU-Pathway and BYU-Idaho web development courses.
            </p>
            <ProjectList projects={projects} />
        </section>
    );
}
