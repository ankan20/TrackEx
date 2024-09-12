"use client";
import React, { useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import Link from 'next/link';

export default function LoginForm() {
  const [role, setRole] = useState<'teacher' | 'admin'>('teacher');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Added state for success message
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    setSuccessMessage(''); // Reset success message

    try {
      const response = await axios.post('/api/login', {
        role,
        name,
        password,
      });
      
      // Save user data in localStorage
      localStorage.setItem('userId', response.data.id);
      localStorage.setItem('userName', response.data.name);
      localStorage.setItem('userRole', response.data.role);

      // Set success message and redirect
      setSuccessMessage('Login successful!');
      setTimeout(() => {
        router.push('/'); // Adjust the route as needed
      }, 2000); // Wait 2 seconds before redirecting
    } catch (error:any) {
      setMessage(`Login error: ${error.response?.data.message || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black mt-9">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Login to TrackEX
      </h2>
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="role">Role</Label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value as 'teacher' | 'admin')}
            className="block w-full p-2 border rounded dark:bg-black dark:text-white"
          >
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Tyler"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </LabelInputContainer>
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Login"}
          <BottomGradient />
        </button>

        {successMessage && <p className="mt-4 text-center text-green-500">{successMessage}</p>}
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        <p className="text-sm font-normal text-white mt-4">
          Don't have an account? 
          <Link href="/signup" className="text-blue-400 hover:underline ml-2">Sign up</Link>
        </p>
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
