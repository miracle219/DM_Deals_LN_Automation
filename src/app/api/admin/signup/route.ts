import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { createId } from '@paralleldrive/cuid2';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      password
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

    // Create admin user
    const [newUser] = await db.insert(users).values({
      id: createId(),
      firstName,
      lastName,
      email,
      passwordHash: hashedPassword,
      role: 'ADMIN', // Set the role to ADMIN
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();

    return NextResponse.json(
      {
        message: 'Admin user created successfully',
        user: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          role: newUser.role
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating admin user:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}