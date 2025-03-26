import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { Sidebar } from '@/components/layout/sidebar';

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen bg-gray-50 ">
      {/* Sidebar */}
      <Sidebar className='h-[700px] pt-8 border-r' />

      {/* Main Content */}
      <main className="flex-1 px-8">
        <div className="">
          {children}
        </div>
      </main>
    </div>
  );
}