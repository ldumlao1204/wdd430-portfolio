import Link from 'next/link';

export default function ProjectsLayout({ children }: LayoutProps<'/projects'>) {
    return (
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-12">
            <nav aria-label="Projects" className="mb-8 pb-4 border-b border-gray-200">
                <ul className="flex flex-wrap gap-6">
                    <li><Link href="/projects" className="text-blue-700 hover:underline underline-offset-4">Overview</Link></li>
                    <li><Link href="/projects/opensource" className="text-blue-700 hover:underline underline-offset-4">Open Source</Link></li>
                    <li><Link href="/projects/school" className="text-blue-700 hover:underline underline-offset-4">School</Link></li>
                </ul>
            </nav>
            {children}
        </main>
    );
}