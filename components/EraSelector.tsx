import React from 'react';
import { Era } from '../types';
import { ERAS } from '../constants';

interface EraSelectorProps {
  onSelectEra: (era: Era) => void;
}

export const EraSelector: React.FC<EraSelectorProps> = ({ onSelectEra }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
      {ERAS.map((era) => (
        <button
          key={era.id}
          onClick={() => onSelectEra(era)}
          className="group relative h-80 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-violet-500/50 text-left"
        >
          {/* Background Image Placeholder with Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${era.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
          
          {/* Use a visual pattern or gradient instead of external images to ensure stability if placeholder fails, 
              but we can use the placeholder if we want. Let's use a rich gradient background. */}
          <div className={`absolute inset-0 bg-gradient-to-t ${era.color} mix-blend-overlay opacity-50`} />

          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
              <h3 className="text-3xl font-bold mb-2 text-white">{era.name}</h3>
              <p className="text-gray-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 h-0 group-hover:h-auto overflow-hidden">
                {era.description}
              </p>
            </div>
            
            <div className="mt-4 flex items-center text-violet-300 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
              <span>Travel to this era</span>
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
          
          {/* Border Glow */}
          <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-white/30 transition-colors" />
        </button>
      ))}
    </div>
  );
};