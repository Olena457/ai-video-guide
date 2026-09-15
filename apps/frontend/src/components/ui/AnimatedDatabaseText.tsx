export const AnimatedDatabaseText = ({
  text = "SERVER WAKING UP",
  subText = "PLEASE WAIT A MOMENT...",
}) => {
  return (
    <div className="pointer-events-none rounded-full p-10 text-center [background:radial-gradient(circle,rgba(255,255,255,0.8)_0%,rgba(255,255,255,0)_70%)] dark:[background:radial-gradient(circle,rgba(28,28,30,0.8)_0%,rgba(28,28,30,0)_70%)]">
      <div className="relative inline-block">
        <style>
          {`
            @keyframes fillText {
              0%, 100% { clip-path: polygon(0% 45%, 16% 44%, 33% 50%, 54% 60%, 70% 61%, 84% 59%, 100% 52%, 100% 100%, 0% 100%); }
              50% { clip-path: polygon(0% 60%, 15% 65%, 34% 66%, 51% 62%, 67% 50%, 84% 45%, 100% 46%, 100% 100%, 0% 100%); }
            }
            .text-stroke {
              -webkit-text-stroke: 1px #08815e; 
              color: transparent;
            }
            .text-fill {
              color: #10b981; 
              animation: fillText 3s ease-in-out infinite;
            }
            .dark .text-stroke {
              -webkit-text-stroke: 1px #b16b08;
            }
            .dark .text-fill {
              color: #facc15;
            }
          `}
        </style>

        <h2 className="text-stroke text-2xl sm:text-3xl font-black uppercase leading-tight tracking-[2px]">
          {text}
        </h2>

        <h2 className="text-fill absolute left-0 top-0 w-full text-2xl sm:text-3xl font-black uppercase leading-tight tracking-[2px]">
          {text}
        </h2>
      </div>

      {subText && (
        <p className="mt-2 text-xs sm:text-sm font-medium tracking-wider text-[#08815e] opacity-80 dark:text-[#facc15]">
          {subText}
        </p>
      )}
    </div>
  );
};
