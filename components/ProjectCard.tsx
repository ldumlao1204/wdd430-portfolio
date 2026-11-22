import Link from 'next/link';
import { deleteProject } from '@/lib/actions';

interface ProjectCardProps {
    id?: number;
    title: string;
    description: string;
    technologies: string[];
    link?: string;
}

export default function ProjectCard({ id, title, description, technologies, link }: ProjectCardProps) {
    return (
        <article className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-700 mb-3">{description}</p>
            <p className="text-sm text-gray-600">
                <strong>Technologies:</strong> {technologies.join(', ')}
            </p>
            {link && (
                <p className="mt-2">
                    <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:underline">View Project</a>
                </p>
            )}
            {id !== undefined && (
                <div className="mt-3 flex items-center gap-4">
                    <Link href={`/projects/${id}/edit`} className="text-sm font-medium text-blue-700 hover:underline underline-offset-4">
                        Edit<span className="sr-only"> {title}</span>
                    </Link>
                    <form action={deleteProject.bind(null, id)}>
                        <button type="submit" className="text-sm font-medium text-red-700 hover:underline underline-offset-4">
                            Delete<span className="sr-only"> {title}</span>
                        </button>
                    </form>
                </div>
            )}
        </article>
    );
}
