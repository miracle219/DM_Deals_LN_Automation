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

    validateSession();
  }, [session, status, router]);


  if (isValidating) {
    return null;
  }

  return <>{children}</>;
}