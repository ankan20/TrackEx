import { NextResponse } from 'next/server';
import Admin from '@/models/Admin';
import Teacher from '@/models/Teacher';
import dbConnect from '@/utils/dbConnect';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { role, name, email, password } = await request.json();

    // Basic validation
    if (!role || !name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    let user;

    // Create the user based on the role
    if (role === 'admin') {
      user = new Admin({
        name: name,
        email,
        password,
      });
    } else if (role === 'teacher') {
      user = new Teacher({
        name: name,
        email,
        password,
      });
    } else {
      return NextResponse.json({ error: 'Invalid role.' }, { status: 400 });
    }

    // Save the user to the database
    await user.save();

    return NextResponse.json({ message: 'User created successfully.' }, { status: 201 });
  } catch (error) {
    console.error('Error during signup:', error);
    return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 });
  }
}
