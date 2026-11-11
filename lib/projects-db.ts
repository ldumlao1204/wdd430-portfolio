export interface Project {
    id: number;
    title: string;
    description: string;
    type: 'opensource' | 'school';
    technologies: string[];
    link?: string;
}

export const projects: Project[] = [
    {
        id: 1,
        title: 'WDD430 Portfolio',
        description: 'This portfolio website, built with Next.js, TypeScript and Tailwind CSS. The code is public on GitHub.',
        type: 'opensource',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
        link: 'https://github.com/ldumlao1204/wdd430-portfolio',
    },
    {
        id: 2,
        title: 'CSE341 Project 2',
        description: 'A REST API for managing students and courses, with GitHub login and Swagger documentation.',
        type: 'school',
        technologies: ['Node.js', 'Express', 'MongoDB', 'Passport', 'Swagger'],
        link: 'https://github.com/ldumlao1204/cse341-project2',
    },
    {
        id: 3,
        title: 'World e-Travel Explorer',
        description: 'An API app that fetches and displays country information.',
        type: 'school',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        link: 'https://ldumlao1204.github.io/WDD330-Final-Project/',
    },
];

export function getProjects(type?: string | null): Project[] {
    if (type) return projects.filter((p) => p.type === type);
    return projects;
}

export function getProjectById(id: number): Project | null {
    return projects.find((p) => p.id === id) ?? null;
}
