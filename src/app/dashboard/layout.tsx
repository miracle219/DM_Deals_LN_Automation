import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { CustomerSidebar } from '@/components/layout/customer-sidebar';
import { authOptions } from "@/lib/auth-config";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Redirect if not authenticated
  if (!session || !session.user) {
    redirect('/login');
  }

  // Redirect admins to their dashboard - with null check
  if (session.user?.role === 'ADMIN') {
    redirect('/admin/dashboard');
  }

  // Check if onboarding is completed by verifying all required fields are present - with null checks
  const hasCompletedOnboarding =
    // Role should be defined and is not default CUSTOMER
    (session.user?.role && session.user.role !== "CUSTOMER") &&
    // Referral source should be defined
    !!session.user?.referralSource &&
    // Company should be defined
    !!session.user?.company;

  // Redirect to onboarding if needed
  if (!hasCompletedOnboarding) {
    redirect('/onboarding');
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <CustomerSidebar className='h-screen pt-8 border-r' />

      {/* Main Content */}
      <main className="flex-1 px-8">
        <div className="">
          {children}
        </div>
      </main>
    </div>
  );
}