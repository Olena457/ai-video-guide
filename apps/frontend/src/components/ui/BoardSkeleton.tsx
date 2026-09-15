"use client";

export function BoardSkeleton() {
  const columns = Array.from({ length: 4 });
  const cards = Array.from({ length: 3 });

  return (
    <div className="flex-1 overflow-auto custom-scrollbar p-4 md:p-8 w-full">
      <div className="grid grid-cols-1 justify-items-center md:justify-items-stretch md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-2 pb-12">
        {columns.map((_, colIndex) => (
          <div
            key={colIndex}
            className="flex flex-col gap-3 w-full max-w-[350px] min-w-[280px] bg-surface/30 rounded-2xl p-3 border border-border/30"
          >
            <div className="h-6 w-24 bg-border/40 rounded-md animate-pulse mb-2 ml-1"></div>
            {cards.map((_, cardIndex) => (
              <div
                key={cardIndex}
                className="p-4 bg-surface rounded-xl shadow-sm border border-border/50 flex flex-col min-h-[120px] animate-pulse"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex gap-2">
                    <div className="h-5 w-16 bg-border/30 rounded-md"></div>
                    <div className="h-5 w-12 bg-border/30 rounded-md"></div>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="h-5 w-5 bg-border/30 rounded-md"></div>
                    <div className="h-5 w-5 bg-border/30 rounded-md"></div>
                  </div>
                </div>
                <div className="h-5 w-3/4 bg-border/40 rounded-md mb-3"></div>
                <div className="flex flex-col gap-1.5 mb-4">
                  <div className="h-3 w-full bg-border/20 rounded"></div>
                  <div className="h-3 w-5/6 bg-border/20 rounded"></div>
                </div>
                <div className="mt-auto pt-2 flex items-center gap-3">
                  <div className="h-6 w-20 bg-border/30 rounded-sm"></div>
                  <div className="h-6 w-24 bg-border/30 rounded-sm"></div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
