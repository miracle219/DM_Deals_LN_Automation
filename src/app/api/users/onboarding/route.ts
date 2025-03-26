import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function PUT(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get request body
    const body = await request.json();
    const { userId, role, referralSource, company } = body;

    // Verify that the authenticated user can only update their own profile
    if (session.user.id !== userId) {
      return NextResponse.json(
        { message: 'Forbidden: You can only update your own profile' },
        { status: 403 }
      );
    }

    // Update user
    const [updatedUser] = await db
      .update(users)
      .set({
        role,
        referralSource,
        company,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();

    if (!updatedUser) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser.id,
        role: updatedUser.role,
        company: updatedUser.company,
        referralSource: updatedUser.referralSource,
      },
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}