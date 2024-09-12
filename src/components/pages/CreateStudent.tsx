"use client";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import Link from 'next/link';

export default function CreateStudentForm() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [rollNumber, setRollNumber] = useState('');
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if user is an admin
    const userRole = localStorage.getItem("userRole");
    setIsAdmin(userRole === "admin");
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await axios.post('/api/create-student', {
        rollNumber,
        name,
        className,
      });

      // Handle successful response
      setMessage('Student created successfully!');
      setTimeout(() => {
        setRollNumber('');
        setName('');
        setClassName('');
        setMessage('');
      }, 2000); // Wait 2 seconds before redirecting
    } catch (error:any) {
      // Handle error response
      setMessage(`Creation error: ${error.response?.data.message || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black mt-9">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Admin Access Required
        </h2>
        <p className="text-center text-red-500">
          Please log in as an admin to access this page.
        </p>
        <Link href="/login" className="text-blue-400 hover:underline mt-4 block text-center">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black mt-40">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Create Student
      </h2>
      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="rollNumber">Roll Number</Label>
          <Input
            id="rollNumber"
            placeholder="12345"
            type="text"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="John Doe"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="className">Class</Label>
          <Input
            id="className"
            placeholder="10th Grade"
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />
        </LabelInputContainer>
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Create Student"}
          <BottomGradient />
        </button>

        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
