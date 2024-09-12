"use client";
import React, { useState, useEffect } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { cn } from "@/lib/utils";
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isTeacher, setIsTeacher] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // Check user role and name from localStorage
    const userRole = localStorage.getItem('userRole');
    const username = localStorage.getItem('userName');
    const isUserLoggedIn = !!userRole && !!username;

    if (isUserLoggedIn) {
      setIsLoggedIn(true);
      let temp = "Hi, " + username;
      setUserName(temp);

      if (userRole === 'admin') {
        setIsAdmin(true);
      } else if (userRole === 'teacher') {
        setIsTeacher(true);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setIsAdmin(false);
    setIsTeacher(false);
    setUserName("");
    router.push('/login'); // Redirect to login page or home page
  };

  return (
    <div>
      <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
     
        <Menu setActive={setActive}>
          {!isLoggedIn && (<Link href={"/"}><div className=" cursor-pointer  font-bold text-blue-400 ">TrackEX</div></Link>)}
        
        
          {isAdmin && (
            <div className="flex space-x-4">
              <Link href={"/"}><div className="absolute left-10 cursor-pointer  font-bold text-blue-400 ">TrackEX</div></Link>
              <Link href={"/admin/get-barcode"}><MenuItem setActive={setActive} active={active} item="Make QR Code"></MenuItem></Link>      
              <Link href={'/admin/scan-barcode'}> <MenuItem setActive={setActive} active={active} item="Scan QR Code">
                
                </MenuItem></Link>
              
              <Link href={"/admin/add-student"}><MenuItem setActive={setActive} active={active} item="Add student"></MenuItem></Link>
            </div>
          )}
          {isTeacher && !isAdmin && (
            <div className="flex space-x-4">
              <Link href={"/"}><div className="absolute left-10 cursor-pointer  font-bold text-blue-400 ">TrackEX</div></Link>
              <Link href={"/teacher/scanqr"}><MenuItem setActive={setActive} active={active} item="Scan QR Code">
              </MenuItem></Link>
              
              <p className="text-blue-300 absolute right-28">{userName}</p>
            </div>
          )}
          {!isLoggedIn && (
            <div className="absolute right-8">
              <Link href="/login" className="text-blue-400 hover:underline">Login</Link>
            </div>
          )}
          {isLoggedIn && (
            <div className="absolute right-8 flex items-center space-x-4">
              <div onClick={handleLogout} className="cursor-pointer">Logout</div>
            </div>
          )}
        </Menu>
      </div>
    </div>
  );
}