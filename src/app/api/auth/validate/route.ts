import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth-config";
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// This API endpoint validates that a user session corresponds to a user in the database
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ valid: false, message: 'No session found' }, { status: 401 });
    }

    // Check if user exists in database
    const user = await db.query.users.findFirst({
      where: eq(users.id, session.user.id),
    });

    if (!user) {
      return NextResponse.json({
        valid: false,
        message: 'User no longer exists in database',
        action: 'LOGOUT'
      }, { status: 404 });
    }

    return NextResponse.json({ valid: true });
  } catch (error) {
    console.error('Error validating session:', error);
    return NextResponse.json({
      valid: false,
      message: 'Error validating session',
      action: 'LOGOUT'
    }, { status: 500 });
  }
}