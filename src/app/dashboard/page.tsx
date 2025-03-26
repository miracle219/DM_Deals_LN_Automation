import { redirect } from 'next/navigation';

export default function DashboardPage() {
  // For regular customers, redirect to the target page
  redirect('/dashboard/target');
}