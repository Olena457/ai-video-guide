"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-4 md:p-8  transition-colors duration-300">
      <div className="flex flex-col items-center justify-center mt-20 text-center max-w-xl mx-auto px-2">
        <h1 className="text-4xl min-[475px]:text-5xl font-extrabold tracking-tight mb-4 text-gradient pb-2">
          Video-guide
        </h1>

        <p className="text-base min-[475px]:text-lg text-primary mb-8">
          The ultimate tool to manage your professional and personal daily tasks
        </p>

        <Link
          href="/guide"
          className="btn-gradient font-bold py-2.5 px-6 min-[475px]:py-3 min-[475px]:px-8 rounded-[16px] inline-block text-base min-[475px]:text-lg shadow-md transition-all duration-300"
        >
          upload your video
        </Link>
      </div>
    </main>
  );
}
