import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { db } from '@/lib/db';
import { users, teamInvites } from '@/lib/db/schema';
import { createId } from '@paralleldrive/cuid2';
import { desc } from 'drizzle-orm';

// Fetch all users
export async function GET() {
  try {
    // Fetch all users from the database
    const allUsers = await db.query.users.findMany({
      orderBy: [desc(users.createdAt)],
    });

    // Return the users as JSON
    return NextResponse.json(allUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

//  Create a new user
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      password,
      sellingProducts,
      avgDealSize,
      teamEmails
    } = body;

    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user with the additional fields
    const [newUser] = await db.insert(users).values({
      id: createId(),
      firstName,
      lastName,
      email,
      passwordHash: hashedPassword,
      sellingProducts,
      avgDealSize,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();

    // Process team emails if provided
    if (teamEmails) {
      const emailList: string[] = teamEmails.split('\n').filter((email: string) => email.trim());

      if (emailList.length > 0) {
        const invites = emailList.map(email => ({
          id: createId(),
          userId: newUser.id,
          email: email.trim(),
          createdAt: new Date(),
          updatedAt: new Date(),
        }));

        await db.insert(teamInvites).values(invites);
      }
    }

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}