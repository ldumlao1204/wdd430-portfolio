import { NextRequest, NextResponse } from 'next/server';
import { getProjectById } from '@/lib/projects-db';

// GET /api/projects/1
export async function GET(
    _request: NextRequest,
    ctx: RouteContext<'/api/projects/[id]'>
) {
    const { id } = await ctx.params;
    const projectId = Number(id);

    if (!Number.isInteger(projectId)) {
        return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    const project = getProjectById(projectId);

    if (!project) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(project);
}
