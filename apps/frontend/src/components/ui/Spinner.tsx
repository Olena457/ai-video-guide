
import { useState, useEffect } from "react";
import { AnimatedDatabaseText } from "./AnimatedDatabaseText"; 

export const Spinner = () => {
  const [showSlowMessage, setShowSlowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSlowMessage(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex h-screen w-screen flex-col items-center justify-center bg-background/99">
      <div className="loader" />

      {showSlowMessage && (
        <div className="absolute top-[60%] z-50 flex w-[90%] justify-center animate-in fade-in duration-1000">
          <AnimatedDatabaseText
            text="WAKING UP SERVER"
            subText="FREE TIER TAKES A LITTLE LONGER..."
          />
        </div>
      )}
    </div>
  );
};