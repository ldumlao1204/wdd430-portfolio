interface ContactCardProps {
    email: string;
    github: string;
    linkedin?: string;
}

export default function ContactCard({ email, github, linkedin }: ContactCardProps) {
    return (
        <address className="not-italic p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Contact Me</h2>
            <ul className="space-y-2">
                <li>
                    <strong>Email:</strong>{' '}
                    <a href={`mailto:${email}`} className="text-blue-700 hover:underline">{email}</a>
                </li>
                <li>
                    <strong>GitHub:</strong>{' '}
                    <a href={`https://github.com/${github}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
                        github.com/{github}
                    </a>
                </li>
                {linkedin && (
                    <li>
                        <strong>LinkedIn:</strong>{' '}
                        <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
                            View my LinkedIn profile
                        </a>
                    </li>
                )}
            </ul>
        </address>
    );
}
