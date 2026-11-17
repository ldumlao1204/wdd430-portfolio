'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    function createPageURL(pageNumber: number) {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    }

    if (totalPages <= 1) return null;

    return (
        <nav aria-label="Pagination" className="mt-8 flex items-center justify-between">
            {currentPage > 1 ? (
                <Link href={createPageURL(currentPage - 1)} className="text-blue-700 hover:underline underline-offset-4">
                    ← Previous
                </Link>
            ) : (
                <span aria-disabled="true" className="text-gray-400">← Previous</span>
            )}

            <p className="text-sm text-gray-600">Page {currentPage} of {totalPages}</p>

            {currentPage < totalPages ? (
                <Link href={createPageURL(currentPage + 1)} className="text-blue-700 hover:underline underline-offset-4">
                    Next →
                </Link>
            ) : (
                <span aria-disabled="true" className="text-gray-400">Next →</span>
            )}
        </nav>
    );
}





