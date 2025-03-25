"use client";
import Link from 'next/link';
import Image from 'next/image';
import { SignupForm } from '@/components/auth/signup-form';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';

export default function SignupPage() {
  const [scrolled, setScrolled] = useState(false);

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
    <div className="min-h-screen p-6 flex flex-col">
      {/* Header Section */}
      <header className={`py-4 sticky top-4 z-50 transition-all duration-300 ${scrolled ? 'bg-white/70 backdrop-blur-md border mx-4 rounded-lg' : ''}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Icon icon="ion:file-tray-full-outline" width="24" />
            <span className="text-xl font-bold">DM Deals</span>
          </div>

          <div className="flex-1"></div>

          <nav className="hidden md:flex items-center space-x-6 mr-8">
            <Link href="#features" className="flex items-center space-x-1 font-medium hover:text-gray-900">
              <Icon icon="ion:cube-outline" />
              <span>Features</span>
            </Link>
            <Link href="#education" className="flex items-center space-x-1 font-medium hover:text-gray-900">
              <Icon icon="ion:book-outline" />
              <span>Education</span>
            </Link>
            <Link href="#pricing" className="flex items-center space-x-1 font-medium hover:text-gray-900">
              <Icon icon="ion:chatbubbles-outline" />
              <span>Pricing</span>
            </Link>
          </nav>

          <div className="grid grid-cols-2 items-center justify-between space-x-6">
            <Link href="/login" className="flex items-center px-4 py-2 border rounded-md justify-center hover:bg-gray-100">Login</Link>
            <Link
              href="/signup"
              className="bg-black text-white px-4 py-2 rounded-md justify-center hover:bg-gray-800 flex items-center"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-grow flex flex-col">
        <div className="p-2 md:p-8 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="flex justify-center mb-2 relative">
              <div className="text-center">
                <div className="flex justify-center items-center">
                  <div className="relative">
                    <div className="max-w-md">
                      <Image
                        src="/signup.svg"
                        alt="Signup illustration"
                        width={250}
                        height={200}
                        priority
                        className="mb-4"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Signup Form */}
            <div>
              <SignupForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}