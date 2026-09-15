"use client";

import Link from "next/link";
import TaskHeader from "../src/components/common/TaskHeader";

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-4 md:p-8 text-primary transition-colors duration-300">
      <TaskHeader showBackLink={false} />

      <div className="flex flex-col items-center justify-center mt-20 text-center max-w-xl mx-auto px-2">
        <h1 className="text-4xl min-[475px]:text-5xl font-extrabold tracking-tight mb-4 text-gradient pb-2">
          Welcome to TaskFlow
        </h1>

        <p className="text-base min-[475px]:text-lg text-secondary mb-8">
          The ultimate tool to manage your professional and personal daily tasks
          efficiently.
        </p>

        <Link
          href="/tasks"
          className="btn-gradient font-bold py-2.5 px-6 min-[475px]:py-3 min-[475px]:px-8 rounded-[16px] inline-block text-base min-[475px]:text-lg shadow-md transition-all duration-300"
        >
          Go to Tasks
        </Link>
      </div>
    </main>
  );
}
