"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrolled, setScrolled] = useState(false);
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <div className="px-28">
      {/* Header Section */}
      <header className={`py-4 sticky top-4 z-50 transition-all duration-300 ${scrolled ? 'bg-white/70 backdrop-blur-md border mx-4 rounded-lg' : ''}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Icon icon="ion:file-tray-full-outline" width="24" />
            <span className="text-xl font-bold">DM Deals</span>
          </div>

          <div className="flex-1"></div>

          <nav className="hidden md:flex items-center space-x-6 mr-8">
            <Link
              href="#features"
              className="flex items-center space-x-1 font-medium hover:text-gray-900 relative group"
            >
              <Icon icon="ion:cube-outline" />
              <span>Features</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              href="#education"
              className="flex items-center space-x-1 font-medium hover:text-gray-900 relative group"
            >
              <Icon icon="ion:book-outline" />
              <span>Education</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              href="#pricing"
              className="flex items-center space-x-1 font-medium hover:text-gray-900 relative group"
            >
              <Icon icon="ion:chatbubbles-outline" />
              <span>Pricing</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          <div className="grid grid-cols-1 items-center justify-between">
            {isAuthenticated ? (
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
              >
                <span>Go to Dashboard</span>
                <Icon icon="ion:arrow-forward-outline" />
              </Link>
            ) : (
              <div className="grid grid-cols-2 items-center justify-between space-x-6">
                <Link href="/login" className="flex items-center px-4 py-2 border rounded-md justify-center hover:bg-gray-100">Login</Link>
                <Link
                  href="/signup"
                  className="bg-black text-white px-4 py-2 rounded-md justify-center hover:bg-gray-800 flex items-center"
                >
                  Get started
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}