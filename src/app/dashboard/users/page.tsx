"use client";

import { useState, useEffect, ReactNode } from 'react';
import { Icon } from '@iconify/react';
import { DataTable } from '@/components/layout/data-table';
import { User, FormattedUser } from '@/types/user';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function DashboardUsersPage() {
  const [users, setUsers] = useState<FormattedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/api/users');

        if (!response.ok) {
          throw new Error(`Error fetching users: ${response.status}`);
        }

        const data = await response.json();

        // Format the users data
        const formattedUsers: FormattedUser[] = data.map((user: User) => ({
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          company: user.company || '-',
          sellingProducts: user.sellingProducts || '-',
          avgDealSize: user.avgDealSize || '-',
          createdAt: new Date(user.createdAt).toISOString()
        }));

        setUsers(formattedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load users. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  // Action buttons for the table
  const actionButtons: ReactNode[] = [
    <button
      key="add"
      className="flex items-center space-x-1 px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-50"
    >
      <Icon icon="ion:add" />
      <span>Add User</span>
    </button>,
    <button
      key="export"
      className="flex items-center space-x-1 px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-50"
    >
      <Icon icon="ion:download-outline" />
      <span>Export</span>
    </button>
  ];

  // Define columns for the data table
  const columns = [
    {
      id: 'name',
      header: 'Name',
      cell: (user: FormattedUser) => (
        <div className="flex items-center space-x-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-gray-200 text-gray-700">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{user.name}</span>
        </div>
      )
    },
    {
      id: 'email',
      header: 'Email',
      accessorKey: 'email' as keyof FormattedUser,
    },
    {
      id: 'company',
      header: 'Company',
      accessorKey: 'company' as keyof FormattedUser,
    },
    {
      id: 'sellingProducts',
      header: 'Selling Products',
      accessorKey: 'sellingProducts' as keyof FormattedUser,
    },
    {
      id: 'avgDealSize',
      header: 'Deal Size',
      accessorKey: 'avgDealSize' as keyof FormattedUser,
    },
    {
      id: 'createdAt',
      header: 'Created At',
      cell: (user: FormattedUser) => {
        const date = new Date(user.createdAt);
        return date.toLocaleDateString();
      },
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500 text-center">
          <Icon icon="ion:alert-circle" className="text-4xl mb-2" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Icon icon="ion:people-outline" className="text-4xl mb-2 text-gray-400" />
        <p className="text-gray-500">No users found</p>
      </div>
    );
  }

    return (
      <div className='py-20'>
    <DataTable
      data={users}
      columns={columns}
      title="Users"
      totalCount={users.length}
      actions={actionButtons}
      enableSelection={true}
      enableHover={true}
      className="shadow-sm"
            />
            </div>
  );
}