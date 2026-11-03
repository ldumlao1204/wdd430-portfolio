import Link from 'next/link';

export default function Header() {
    return (
        <header className="bg-gray-800 text-white py-4 shadow-md">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <div id="header-title" className="text-2xl font-bold">Leilany Dumlao</div>
                <nav>
                    <ul className="flex gap-6">
                        <li><Link href="/" className="hover:underline hover:text-gray-300 underline-offset-4">Home</Link></li>
                        <li><Link href="/about" className="hover:underline hover:text-gray-300 underline-offset-4">About</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
