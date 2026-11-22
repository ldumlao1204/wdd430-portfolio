import Link from 'next/link';
import { createProject } from '@/lib/actions';

const inputClasses =
    'w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500';

export default function CreateProjectPage() {
    return (
        <section>
            <h1 className="text-3xl font-bold mb-4">Add a New Project</h1>
            <p className="text-lg text-gray-700 mb-8">Fill in the details below to add a project to my portfolio.</p>

            <form action={createProject} className="space-y-5 max-w-xl">
                <div>
                    <label htmlFor="title" className="block mb-1 font-medium">Title</label>
                    <input id="title" name="title" type="text" required className={inputClasses} />
                </div>

                <div>
                    <label htmlFor="description" className="block mb-1 font-medium">Description</label>
                    <textarea id="description" name="description" rows={4} required className={inputClasses} />
                </div>

                <div>
                    <label htmlFor="type" className="block mb-1 font-medium">Project type</label>
                    <select id="type" name="type" required defaultValue="" className={inputClasses}>
                        <option value="" disabled>Choose a type</option>
                        <option value="opensource">Open Source</option>
                        <option value="school">School</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="technologies" className="block mb-1 font-medium">Technologies (comma-separated)</label>
                    <input
                        id="technologies"
                        name="technologies"
                        type="text"
                        required
                        placeholder="Next.js, TypeScript, Tailwind CSS"
                        className={inputClasses}
                    />
                </div>

                <div>
                    <label htmlFor="link" className="block mb-1 font-medium">Link (optional)</label>
                    <input id="link" name="link" type="url" placeholder="https://..." className={inputClasses} />
                </div>

                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        className="rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Save Project
                    </button>
                    <Link href="/projects" className="text-blue-700 hover:underline underline-offset-4">Cancel</Link>
                </div>
            </form>
        </section>
    );
}
