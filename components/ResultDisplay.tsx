import React from 'react';
import { Era } from '../types';
import { Button } from './Button';

interface ResultDisplayProps {
  originalImage: string;
  generatedImage: string;
  era: Era;
  onReset: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  originalImage,
  generatedImage,
  era,
  onReset
}) => {
  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `chronolens-${era.id}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-6xl mx-auto animate-fadeIn">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to {era.name}
        </h2>
        <p className="text-xl text-gray-400">Your temporal displacement was successful.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Original */}
        <div className="glass-panel p-4 rounded-2xl">
          <div className="mb-4 flex items-center justify-between">
             <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Original Timeline</span>
          </div>
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-black/50">
            <img 
              src={originalImage} 
              alt="Original" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Generated */}
        <div className="glass-panel p-4 rounded-2xl relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity -z-10"></div>
          <div className="mb-4 flex items-center justify-between">
             <span className="text-sm font-medium text-violet-300 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                AI Generated
             </span>
          </div>
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-black/50">
            <img 
              src={generatedImage} 
              alt={`You in ${era.name}`} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-center items-center pb-20">
        <Button 
          variant="secondary" 
          onClick={onReset}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          }
        >
          Try Another Era
        </Button>
        <Button 
          variant="primary" 
          size="lg"
          onClick={downloadImage}
          icon={
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          }
        >
          Download Souvenir
        </Button>
      </div>
    </div>
  );
};