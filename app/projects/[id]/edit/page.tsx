import Link from 'next/link';
import { getProjectById } from '@/lib/projects-db';
import { updateProject } from '@/lib/actions';

const inputClasses =
    'w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500';

export default async function EditProjectPage(props: PageProps<'/projects/[id]/edit'>) {
    // 1. Read the id from the URL: "5" → 5
    const params = await props.params;
    const id = Number(params.id);

    // 2. Load the project (a bad id like "abc" skips the database)
    const project = Number.isInteger(id) && id > 0 ? await getProjectById(id) : null;

    if (!project) {
        return (
            <section>
                <h1 className="text-3xl font-bold mb-4">Project not found</h1>
                <Link href="/projects" className="text-blue-700 hover:underline underline-offset-4">Back to Projects</Link>
            </section>
        );
    }

    // 3. Pre-fill the id, so the action knows WHICH project to update
    const updateProjectWithId = updateProject.bind(null, id);

    return (
        <section>
            <h1 className="text-3xl font-bold mb-4">Edit Project</h1>
            <p className="text-lg text-gray-700 mb-8">Change the details below, then save.</p>

            <form action={updateProjectWithId} className="space-y-5 max-w-xl">
                <div>
                    <label htmlFor="title" className="block mb-1 font-medium">Title</label>
                    <input id="title" name="title" type="text" required defaultValue={project.title} className={inputClasses} />
                </div>

                <div>
                    <label htmlFor="description" className="block mb-1 font-medium">Description</label>
                    <textarea id="description" name="description" rows={4} required defaultValue={project.description} className={inputClasses} />
                </div>

                <div>
                    <label htmlFor="type" className="block mb-1 font-medium">Project type</label>
                    <select id="type" name="type" required defaultValue={project.type} className={inputClasses}>
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
                        defaultValue={project.technologies.join(', ')}
                        className={inputClasses}
                    />
                </div>

                <div>
                    <label htmlFor="link" className="block mb-1 font-medium">Link (optional)</label>
                    <input id="link" name="link" type="url" defaultValue={project.link ?? ''} placeholder="https://..." className={inputClasses} />
                </div>

                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        className="rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Save Changes
                    </button>
                    <Link href="/projects" className="text-blue-700 hover:underline underline-offset-4">Cancel</Link>
                </div>
            </form>
        </section>
    );
}
