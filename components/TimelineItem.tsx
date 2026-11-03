interface TimelineItemProps {
    year: string;
    title: string;
    description: string;
}

export default function TimelineItem({ year, title, description }: TimelineItemProps) {
    return (
        <li className="relative pl-6 pb-8 border-l-2 border-blue-200 last:border-transparent last:pb-0">
            <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-600" aria-hidden="true"></span>
            <p className="text-sm font-semibold text-blue-700">{year}</p>
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-gray-700">{description}</p>
        </li>
    );
}
