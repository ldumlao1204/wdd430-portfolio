import { Suspense } from 'react';
import NavLinks from '@/components/NavLinks';

export default function Header() {
    return (
        <header className="bg-gray-800 text-white py-4 shadow-md">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <div id="header-title" className="text-2xl font-bold">Leilany Dumlao</div>
                {/* usePathname() waits on pages with an unknown [id], so it needs a boundary */}
                <Suspense>
                    <NavLinks />
                </Suspense>
            </div>
        </header>
    );
}
