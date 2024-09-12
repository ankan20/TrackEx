import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect'; // Adjust the import path based on your project structure
import Admin from '@/models/Admin';
import Teacher from '@/models/Teacher';

export async function POST(request: Request) {
  try {
    await dbConnect(); // Ensure the database connection is established

    const { role, name, password } = await request.json();

    let user;

    if (role === 'admin') {
      user = await Admin.findOne({ name });
    } else if (role === 'teacher') {
      user = await Teacher.findOne({ name });
    } else {
      return NextResponse.json({ message: 'Invalid role' }, { status: 400 });
    }

    if (!user || !(password==user.password)) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    return NextResponse.json({ id: user._id.toString(), name: user.name, role: user.role });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
