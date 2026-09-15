"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface TaskReaderProps {
  text: string;
}

export default function TaskReader({ text }: TaskReaderProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const toggleSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.9;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  if (!text) return null;

  return (
    <button
      onClick={toggleSpeech}
      className={`p-1.5 rounded-full transition-colors focus:outline-none ${
        isSpeaking
          ? "bg-accent/20 text-accent"
          : "text-secondary hover:text-accent "
      }`}
      title={isSpeaking ? "Stop reading" : "Read description"}
    >
      {isSpeaking ? (
        <VolumeX size={16} fill="currentColor" />
      ) : (
        <Volume2 size={16} />
      )}
    </button>
  );
}
