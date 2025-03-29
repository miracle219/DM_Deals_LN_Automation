"use client";

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function SessionValidator({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const validateSession = async () => {
      // Only validate if we're authenticated and have a session with a user ID
      if (status === 'authenticated' && session?.user?.id) {
        try {
          const response = await fetch('/api/auth/validate');
          const data = await response.json();

          if (!data.valid && data.action === 'LOGOUT') {
            // User no longer exists in the database - log them out
            toast.error(data.message || 'Your session is invalid', {
              description: 'You have been logged out for security reasons',
              duration: 5000,
            });

            // Sign out and redirect to login
            await signOut({ redirect: false });
            router.push('/login');
          }
        } catch (error) {
          console.error('Error validating session:', error);
        }
      }

      setIsValidating(false);
    };

    // Only run validation if the status is authenticated or loading
    // Skip validation when unauthenticated to avoid unnecessary API calls
    if (status !== 'unauthenticated') {
      validateSession();
    } else {
      setIsValidating(false);
    }
  }, [session, status, router]);


  if (isValidating) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
    </div>;
  }

  return <>{children}</>;
}