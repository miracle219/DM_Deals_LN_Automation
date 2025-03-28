"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrolled, setScrolled] = useState(false);
  const { status, data: session } = useSession();
  const isAuthenticated = status === 'authenticated';
  const isAdmin = session?.user?.role === 'ADMIN';
  const pathname = usePathname();

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

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="px-28">
      {/* Header Section */}
      <header className={`py-4 sticky top-4 z-50 transition-all duration-300 ${scrolled ? 'bg-white/70 backdrop-blur-md border mx-4 rounded-lg' : ''}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 cursor-pointer">
            <Icon icon="ion:file-tray-full-outline" width="24" />
            <span className="text-xl font-bold">DM Demand</span>
          </Link>

          <div className="flex-1"></div>

          <nav className="hidden md:flex items-center space-x-6 mr-8">
            <Link
              href="/#features"
              className={`flex items-center space-x-1 font-medium relative group ${isActive('/#features') ? 'text-blue-500' : 'hover:text-gray-900'}`}
            >
              <Icon icon="ion:cube-outline" />
              <span>Features</span>
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-500 transition-all duration-300 ${isActive('/#features') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </Link>

            <Link
              href="/education"
              className={`flex items-center space-x-1 font-medium relative group ${isActive('/education') ? 'text-blue-500' : 'hover:text-gray-900'}`}
            >
              <Icon icon="ion:book-outline" />
              <span>Education</span>
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-500 transition-all duration-300 ${isActive('/education') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </Link>

            <Link
              href="/pricing"
              className={`flex items-center space-x-1 font-medium relative group ${isActive('/pricing') ? 'text-blue-500' : 'hover:text-gray-900'}`}
            >
              <Icon icon="ion:chatbubbles-outline" />
              <span>Pricing</span>
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-500 transition-all duration-300 ${isActive('/pricing') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </Link>
          </nav>

          <div className="grid grid-cols-1 items-center justify-between">
            {isAuthenticated ? (
              <Link
                href={isAdmin ? "/admin/dashboard" : "/dashboard"}
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

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center space-x-6 mb-6 md:mb-0">
              <Link href="/" className="flex items-center space-x-2">
                <Icon icon="ion:file-tray-full-outline" width="20" />
                <span className="font-bold">DM Demand</span>
              </Link>
            </div>


            <div className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} DM Demand. All rights reserved.
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}