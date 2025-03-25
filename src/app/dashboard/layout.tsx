import { ReactNode } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { Icon } from '@iconify/react';
import { authOptions } from '../api/auth/[...nextauth]/route';

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
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r">
        <div className="p-4 border-b">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Icon icon="ion:file-tray-full-outline" width="20" />
            <span className="font-bold text-lg">DM Deals</span>
          </Link>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link href="/dashboard/users" className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100">
                <Icon icon="ion:people-outline" width="20" />
                <span>Users</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <header className="bg-white border-b">
          <div className="px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold">Dashboard</h1>

            {/* User Profile Dropdown Placeholder */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">{session.user.name}</span>
              <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center" title="User Profile">
                <Icon icon="ion:person-outline" width="18" />
              </button>
            </div>
          </div>
        </header>

        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}