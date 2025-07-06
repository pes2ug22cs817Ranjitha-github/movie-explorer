'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold hover:underline">
        🎬 Movie Explorer
      </Link>
      <Link href="/favorites" className="text-white hover:text-yellow-300">
        ❤️ My Favorites
      </Link>
    </nav>
  );
}
