import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth-config";
import { AdminSidebar } from '@/components/layout/admin-sidebar';

export default async function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Redirect non-admins
  if (!session) {
    redirect('/admin/login');
  }

  if (session.user.role !== 'ADMIN') {
    redirect('/dashboard'); // Redirect to customer dashboard if not admin
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar className='h-screen pt-8 border-r' />

      {/* Main Content */}
      <main className="flex-1 px-8">
        <div className="">
          {children}
        </div>
      </main>
    </div>
  );
}