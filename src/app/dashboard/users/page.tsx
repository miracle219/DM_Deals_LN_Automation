import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';
import { Icon } from '@iconify/react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function UsersPage() {

  const allUsers = await db.query.users.findMany({
    orderBy: [desc(users.createdAt)],
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Users Management</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
          <Icon icon="ion:add-outline" width="18" />
          <span>Add User</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <h3 className="font-medium">All Users</h3>
            <p className="text-sm text-gray-500">Showing {allUsers.length} users</p>
          </div>

          <div className="flex space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                className="px-3 py-2 border rounded-md pl-9 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Icon
                icon="ion:search-outline"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                width="18"
              />
            </div>

            <button className="px-3 py-2 border rounded-md hover:bg-gray-50" title="Filter">
              <Icon icon="ion:funnel-outline" width="18" />
            </button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Selling Products</TableHead>
              <TableHead>Deal Size</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.firstName} {user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.company || '-'}</TableCell>
                <TableCell>{user.sellingProducts || '-'}</TableCell>
                <TableCell>{user.avgDealSize || '-'}</TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <button type="button" className="p-1 hover:text-blue-600" title="View">
                      <Icon icon="ion:eye-outline" width="18" />
                    </button>
                    <button type="button" className="p-1 hover:text-green-600" title="Edit">
                      <Icon icon="ion:create-outline" width="18" />
                    </button>
                    <button type="button" className="p-1 hover:text-red-600" title="Delete">
                      <Icon icon="ion:trash-outline" width="18" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}