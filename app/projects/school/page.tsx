import { Suspense } from 'react';
import SchoolProjectList from '@/components/SchoolProjectList';
import ProjectListSkeleton from '@/components/ProjectListSkeleton';

export default function SchoolProjectsPage() {
    return (
        <section>
            <h1 className="text-3xl font-bold mb-4">School Projects</h1>
            <p className="text-lg text-gray-700 mb-8">
                Projects I built for my BYU-Pathway and BYU-Idaho web development courses.
            </p>

            {/* Skeleton shows right away; the list streams in when the data is ready */}
            <Suspense fallback={<ProjectListSkeleton />}>
                <SchoolProjectList />
            </Suspense>
        </section>
    );
}
