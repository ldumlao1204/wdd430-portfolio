import SkillCard from '@/components/SkillCard';
import TimelineItem from '@/components/TimelineItem';
import ContactCard from '@/components/ContactCard';

const skillGroups = [
    { category: 'Frontend', skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS'] },
    { category: 'Backend', skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs', 'Python'] },
    { category: 'Tools', skills: ['Git', 'GitHub', 'VS Code', 'Swagger'] },
];

const milestones = [
    { year: '2025', title: 'WDD 130: Web Fundamentals', description: 'Built my first websites with HTML and CSS.' },
    { year: '2026', title: 'WDD 131: Dynamic Web Fundamentals', description: 'Built my Heart Warrior Philippines websites with HTML, CSS and JavaScript.' },
    { year: '2026', title: 'WDD 231: Web FrontEnd Development I', description: 'Built my Tetralogy of Fallot | ToF Lifeline websites with HTML, CSS and JavaScript.' },
    { year: '2026', title: 'WDD 330: Web Frontend Development II', description: 'Built World e-Travel Explorer, an app that fetches country data from an API.' },
    { year: '2026', title: 'CSE 341: Web Services', description: 'Built REST APIs with Node.js, Express, MongoDB and GitHub login.' },
    { year: '2026', title: 'WDD 430: Web Full-Stack Development', description: 'Learning React and Next.js by building this portfolio.' },
];

export default function About() {
    return (
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-4">About Me</h1>
            <p className="text-lg text-gray-700 mb-12">
                I am a Software Development student with a passion for creating innovative web applications. I focus on building modern, responsive, and accessible web experiences that provide value to users. Through hands-on projects and continuous learning, I strive to create meaningful solutions that combine functionality, creativity, and exceptional user experience. This page shares more about my background, skills, and the work I have accomplished.
            </p>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Skills</h2>
                <div className="grid gap-4 md:grid-cols-3">
                    {skillGroups.map((group) => (
                        <SkillCard key={group.category} {...group} />
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">My Journey</h2>
                <ol className="ml-2">
                    {milestones.map((milestone) => (
                        <TimelineItem key={milestone.title} {...milestone} />
                    ))}
                </ol>
            </section>

            <ContactCard
                email="leilany.dumlao@gmail.com"
                github="ldumlao1204"
                linkedin="https://www.linkedin.com/in/ldumlaosky"
            />
        </main>
    );
}
