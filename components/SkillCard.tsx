interface SkillCardProps {
    category: string;
    skills: string[];
}

export default function SkillCard({ category, skills }: SkillCardProps) {
    return (
        <article className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-blue-700 mb-3">{category}</h3>
            <ul className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <li key={skill} className="px-3 py-1 text-sm bg-blue-50 text-blue-800 rounded-full">
                        {skill}
                    </li>
                ))}
            </ul>
        </article>
    );
}
