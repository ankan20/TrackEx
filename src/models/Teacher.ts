import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['teacher'], // Only  'teacher' roles are allowed
    default: 'teacher', // Default role is 'teacher'
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Teacher || mongoose.model('Teacher', teacherSchema);
