export default function Loading() {
    return (
        <section role="status" aria-label="Loading open source projects" className="animate-pulse">
            <div className="h-9 w-72 mb-4 rounded bg-slate-200" />
            <div className="h-5 w-full max-w-xl mb-8 rounded bg-slate-200" />

            <div className="grid gap-4 md:grid-cols-2">
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
        </section>
    );
}
