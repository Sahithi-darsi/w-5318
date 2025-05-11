
import React from "react";

export function WaveformAnimation() {
  return (
    <div className="waveform">
      {[...Array(5)].map((_, i) => (
        <div 
          key={i} 
          className={`waveform-bar animate-wave-${(i % 3) + 1}`} 
          style={{ 
            height: `${Math.random() * 16 + 16}px`,
            animationDelay: `${i * 0.1}s`
          }}
        />
      ))}
    </div>
  );
}
