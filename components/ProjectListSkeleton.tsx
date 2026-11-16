export default function ProjectListSkeleton() {
    return (
        <div role="status" aria-label="Loading school projects" className="grid gap-4 md:grid-cols-2 animate-pulse">
            <div className="p-4 border border-gray-200 rounded-lg space-y-3">
                <div className="h-6 w-2/3 rounded bg-slate-200" />
                <div className="h-4 w-full rounded bg-slate-200" />
                <div className="h-4 w-5/6 rounded bg-slate-200" />
                <div className="h-4 w-1/2 rounded bg-slate-200" />
            </div>
            <div className="p-4 border border-gray-200 rounded-lg space-y-3">
                <div className="h-6 w-2/3 rounded bg-slate-200" />
                <div className="h-4 w-full rounded bg-slate-200" />
                <div className="h-4 w-5/6 rounded bg-slate-200" />
                <div className="h-4 w-1/2 rounded bg-slate-200" />
            </div>
        </div>
    );
}
