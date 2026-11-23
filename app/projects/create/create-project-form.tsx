'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { createProject, type State } from '@/lib/actions';

const initialState: State = { message: null, errors: {} };

const inputClasses =
    'w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500';

// One error area per field: always in the page, so screen readers notice when messages appear
function FieldError({ id, errors }: { id: string; errors?: string[] }) {
    return (
        <div id={id} aria-live="polite" aria-atomic="true">
            {errors?.map((error) => (
                <p key={error} className="mt-1 text-sm text-red-700">
                    {error}
                </p>
            ))}
        </div>
    );
}

export default function CreateProjectForm() {
    const [state, formAction, isPending] = useActionState(createProject, initialState);

    return (
        <form action={formAction} className="space-y-5 max-w-xl">
            <div>
                <label htmlFor="title" className="block mb-1 font-medium">Title</label>
                <input id="title" name="title" type="text" required aria-describedby="title-error" className={inputClasses} />
                <FieldError id="title-error" errors={state.errors?.title} />
            </div>

            <div>
                <label htmlFor="description" className="block mb-1 font-medium">Description</label>
                <textarea id="description" name="description" rows={4} required aria-describedby="description-error" className={inputClasses} />
                <FieldError id="description-error" errors={state.errors?.description} />
            </div>

            <div>
                <label htmlFor="type" className="block mb-1 font-medium">Project type</label>
                <select id="type" name="type" required defaultValue="" aria-describedby="type-error" className={inputClasses}>
                    <option value="" disabled>Choose a type</option>
                    <option value="opensource">Open Source</option>
                    <option value="school">School</option>
                </select>
                <FieldError id="type-error" errors={state.errors?.type} />
            </div>

            <div>
                <label htmlFor="technologies" className="block mb-1 font-medium">Technologies (comma-separated)</label>
                <input
                    id="technologies"
                    name="technologies"
                    type="text"
                    required
                    placeholder="Next.js, TypeScript, Tailwind CSS"
                    aria-describedby="technologies-error"
                    className={inputClasses}
                />
                <FieldError id="technologies-error" errors={state.errors?.technologies} />
            </div>

            <div>
                <label htmlFor="yearCompleted" className="block mb-1 font-medium">Year Completed</label>
                <input
                    id="yearCompleted"
                    name="yearCompleted"
                    type="number"
                    min="2000"
                    max="2099"
                    required
                    aria-describedby="yearCompleted-error"
                    className={inputClasses}
                />
                <FieldError id="yearCompleted-error" errors={state.errors?.yearCompleted} />
            </div>

            <div>
                <label htmlFor="link" className="block mb-1 font-medium">Link (optional)</label>
                <input id="link" name="link" type="url" placeholder="https://..." aria-describedby="link-error" className={inputClasses} />
                <FieldError id="link-error" errors={state.errors?.link} />
            </div>

            <div aria-live="polite" aria-atomic="true">
                {state.message ? <p className="text-sm text-red-700">{state.message}</p> : null}
            </div>

            <div className="flex items-center gap-4">
                <button
                    type="submit"
                    disabled={isPending}
                    className="rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isPending ? 'Saving...' : 'Save Project'}
                </button>
                <Link href="/projects" className="text-blue-700 hover:underline underline-offset-4">Cancel</Link>
            </div>
        </form>
    );
}
