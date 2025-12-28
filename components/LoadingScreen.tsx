import React, { useEffect, useState } from 'react';

export const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing Warp Drive...");

  useEffect(() => {
    const messages = [
      "Calibrating Flux Capacitor...",
      "Dialing Temporal Coordinates...",
      "Reshaping History...",
      "Rendering Timeline...",
      "Finalizing Paradox Constraints..."
    ];
    
    let currentMessageIndex = 0;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) return prev;
        return prev + Math.random() * 5;
      });
      
      if (Math.random() > 0.7) {
        currentMessageIndex = (currentMessageIndex + 1) % messages.length;
        setStatusText(messages[currentMessageIndex]);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full text-center">
      <div className="relative w-32 h-32 mb-8">
        <div className="absolute inset-0 border-4 border-violet-500/30 rounded-full animate-ping"></div>
        <div className="absolute inset-0 border-4 border-t-violet-500 border-r-transparent border-b-fuchsia-500 border-l-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-4 bg-white/5 rounded-full blur-xl animate-pulse"></div>
      </div>
      
      <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400 mb-4">
        Time Traveling
      </h3>
      
      <p className="text-gray-400 text-lg mb-8 min-h-[28px]">{statusText}</p>
      
      <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-600 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};