import { redirect } from 'next/navigation';

export default function AdminDashboardPage() {
  // Redirect to the users page as it's our main admin dashboard
  redirect('/admin/dashboard/users');
}