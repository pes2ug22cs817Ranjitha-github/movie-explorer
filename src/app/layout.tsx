// File: src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import DarkModeToggle from "@/components/DarkModeToggle";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movie Explorer App",
  description: "Explore and favorite movies using TMDB API.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-gray-900 dark:text-white`}>
        <nav className="bg-gray-100 dark:bg-gray-900 p-4 shadow mb-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex space-x-6 font-medium text-lg">
              <Link href="/" className="text-blue-600 hover:underline">
                Home
              </Link>
              <Link href="/favorites" prefetch className="text-blue-600 hover:underline">
                My Favorites
              </Link>
            </div>
            <DarkModeToggle />
          </div>
        </nav>
        <main className="max-w-6xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
