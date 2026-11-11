import ProjectList from '@/components/ProjectList';
import { getProjects } from '@/lib/projects-db';

export default function OpenSourceProjectsPage() {
    const projects = getProjects('opensource');

    return (
        <section>
            <h1 className="text-3xl font-bold mb-4">Open Source Projects</h1>
            <p className="text-lg text-gray-700 mb-8">
                Projects and contributions that are shared publicly for anyone to use and improve.
            </p>
            <ProjectList projects={projects} />
        </section>
    );
}
