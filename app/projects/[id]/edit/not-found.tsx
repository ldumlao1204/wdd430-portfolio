import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="mx-auto mt-16 max-w-xl rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900">Project Not Found</h1>
            <p className="mt-3 text-gray-600">The project you are looking for does not exist.</p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                    href="/projects"
                    className="rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50"
                >
                    Back to Projects
                </Link>
            </div>
        </div>
    );
}
