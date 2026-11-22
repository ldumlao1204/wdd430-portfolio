'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function ProjectsError({
    error,
    retry,
}: {
    error: unknown;
    retry: () => void;
}) {
    useEffect(() => {
        // Log for debugging (in production, server errors arrive as a generic message + a digest id)
        console.error('An uncaught error occurred:', error);
    }, [error]);

    return (
        <div role="alert" className="mx-auto mt-16 max-w-xl rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900">Something went wrong!</h1>
            <p className="mt-3 text-gray-600">An unexpected error occurred. Please try again later.</p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                    type="button"
                    onClick={() => retry()}
                    className="rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Try again
                </button>
                <Link
                    href="/projects"
                    className="rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50"
                >
                    Go back to Projects
                </Link>
            </div>
        </div>
    );
}
