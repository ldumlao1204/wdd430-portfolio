import Link from 'next/link';
import ProjectList from '@/components/ProjectList';
import ProjectSearch from '@/components/ProjectSearch';
import Pagination from '@/components/Pagination';
import { fetchFilteredProjects, fetchProjectsPages } from '@/lib/projects-db';

export default async function ProjectsPage(props: PageProps<'/projects'>) {
    const searchParams = await props.searchParams;

    // Never trust the URL: validate before using it in a query
    const query = typeof searchParams.query === 'string' ? searchParams.query.trim().slice(0, 100) : '';
    const pageNumber = Number(searchParams.page ?? 1);
    const currentPage = Number.isInteger(pageNumber) && pageNumber >= 1 ? pageNumber : 1;

    const [projects, totalPages] = await Promise.all([
        fetchFilteredProjects(query, currentPage),
        fetchProjectsPages(query),
    ]);

    return (
        <section>
            <h1 className="text-3xl font-bold mb-4">Projects Overview</h1>
            <p className="text-lg text-gray-700 mb-8">
                Here is an overview of my work. Choose Open Source or School to see each group of projects.
            </p>
            <Link
                href="/projects/create"
                className="inline-block mb-6 rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800"
            >
                + Add Project
            </Link>
            <ProjectSearch />
            {projects.length > 0 ? (
                <ProjectList projects={projects} />
            ) : (
                <p className="text-gray-600">No projects match your search.</p>
            )}
            <Pagination currentPage={currentPage} totalPages={totalPages} />
        </section>
    );
}
