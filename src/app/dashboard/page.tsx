import { redirect } from 'next/navigation';

export default function DashboardPage() {
  // For now, we redirect to the users page as it's our main dashboard
  redirect('/dashboard/users');
}