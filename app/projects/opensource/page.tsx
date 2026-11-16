import ProjectList from '@/components/ProjectList';
import { getProjects } from '@/lib/projects-db'; // Step 3: data comes from the database module

export default async function OpenSourceProjectsPage() {  // Step 2: async Server Component
    const projects = await getProjects('opensource');  // Step 2: "fetch directly in the component"

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
