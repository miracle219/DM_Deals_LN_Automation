"use client";
import Image from 'next/image';
import { LoginForm } from '@/components/auth/login-form';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function LoginPage() {
  const { status } = useSession();

  // Redirect if already authenticated
  useEffect(() => {
    if (status === 'authenticated') {
      redirect('/dashboard');
    }
  }, [status]);

  // If loading, don't render the form yet
  if (status === 'loading' || status === 'authenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 flex flex-col">

      <div className="flex-grow flex flex-col">
        <div className="p-2 md:p-8 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="flex justify-center mb-2 relative">
              <div className="text-center">
                <div className="flex justify-center items-center">
                  <div className="relative">
                    <div className="max-w-md">
                      <Image
                        src="/login.svg"
                        alt="Login illustration"
                        width={250}
                        height={200}
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Login Form */}
            <div className="mt-8">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}