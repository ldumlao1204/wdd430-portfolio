import NavLinks from '@/components/NavLinks';

export default function Header() {
    return (
        <header className="bg-gray-800 text-white py-4 shadow-md">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <div id="header-title" className="text-2xl font-bold">Leilany Dumlao</div>
                <NavLinks />
            </div>
        </header>
    );
}
