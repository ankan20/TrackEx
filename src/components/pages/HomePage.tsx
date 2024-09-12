"use client";
import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "../ui/aurora-background";
import { Button } from "../ui/moving-border";
import { FlipWords } from "../ui/flip-words";
import dynamic from "next/dynamic";
import Link from "next/link"

const World = dynamic(() => import("../ui/globe").then((m) => m.World), {
  ssr: false,
});
export default function AuroraBackgroundDemo() {
  const words = ["management", "tracking", "evaluation", "exams", "attendance"];

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        
        <div className="text-3xl md:text-4xl font-bold dark:text-white text-center">
          Say Goodbye to Errors Experience Hassle-Free <div className="inline text-blue-300"><FlipWords words={words} /></div> with TrackEX
        </div>
        <div className="font-extralight text-base md:text-2xl dark:text-neutral-200 py-4">
          Empowering Institutions with Smart Barcode Tracking for Perfect Accuracy.
        </div>
        <Link href={"/login"}>
        <Button
          borderRadius="1.75rem"
          className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          
        >
          Let's go
        </Button>
        </Link>
      </motion.div>
     

    </AuroraBackground>
  );
}
