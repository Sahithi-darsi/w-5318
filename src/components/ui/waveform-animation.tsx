
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type WaveformProps = {
  isActive?: boolean;
  barCount?: number;
  className?: string;
  variant?: "default" | "recording" | "playback";
};

export function WaveformAnimation({ 
  isActive = false, 
  barCount = 5,
  className,
  variant = "default"
}: WaveformProps) {
  const [heights, setHeights] = useState<number[]>([]);

  // Generate random heights on initial render
  useEffect(() => {
    setHeights(Array.from({ length: barCount }, () => Math.random() * 16 + 16));
  }, [barCount]);

  // Regenerate heights when active state changes if in recording or playback mode
  useEffect(() => {
    if (!isActive || variant === "default") return;
    
    const interval = setInterval(() => {
      setHeights(prev => prev.map(() => {
        // More dramatic height changes during recording
        if (variant === "recording") {
          return Math.random() * 24 + 8;
        }
        return Math.random() * 16 + 16;
      }));
    }, 500);
    
    return () => clearInterval(interval);
  }, [isActive, variant]);

  return (
    <div 
      className={cn(
        "waveform", 
        isActive && "waveform-active",
        variant === "recording" && "waveform-recording",
        variant === "playback" && "waveform-playback",
        className
      )}
    >
      {heights.map((height, i) => (
        <div 
          key={i} 
          className={cn(
            `waveform-bar animate-wave-${(i % 3) + 1}`,
            variant === "recording" && "bg-echo-accent", 
            variant === "playback" && "bg-echo-future",
            isActive && "opacity-100",
            !isActive && "opacity-60"
          )} 
          style={{ 
            height: `${height}px`,
            animationDelay: `${i * 0.1}s`,
            animationDuration: isActive ? `${0.8 + Math.random() * 0.4}s` : "1.5s"
          }}
        />
      ))}
    </div>
  );
}
