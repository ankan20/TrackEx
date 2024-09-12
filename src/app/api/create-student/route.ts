import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Student from '@/models/Student';

export async function POST(request: Request) {
  try {
    // Parse JSON body
    await dbConnect();
    const { rollNumber, name, className } = await request.json();

    // Validate input
    if (!rollNumber || !name || !className) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    // Create a new student
    const newStudent = new Student({ rollNumber, name, className });
    await newStudent.save();

    return NextResponse.json({ message: 'Student created successfully!' }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating student:', error);
    return NextResponse.json({ message: `Error creating student: ${error.message}` }, { status: 500 });
  }
}
