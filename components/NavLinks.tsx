'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' },
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <nav aria-label="Main">
            <ul className="flex gap-6">
                {links.map((link) => {
                    const isActive =
                        link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);

                    return (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                aria-current={isActive ? 'page' : undefined}
                                className={clsx(
                                    'hover:underline hover:text-gray-300 underline-offset-4',
                                    isActive && 'underline font-bold'
                                )}
                            >
                                {link.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
