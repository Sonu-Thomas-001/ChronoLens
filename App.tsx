import React, { useState } from 'react';
import { UploadSection } from './components/UploadSection';
import { EraSelector } from './components/EraSelector';
import { ResultDisplay } from './components/ResultDisplay';
import { LoadingScreen } from './components/LoadingScreen';
import { generateTimeTravelImage } from './services/geminiService';
import { AppStep, Era } from './types';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('intro');
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [selectedEra, setSelectedEra] = useState<Era | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelected = (base64: string) => {
    setOriginalImage(base64);
    setStep('select-era');
    setError(null);
  };

  const handleEraSelected = async (era: Era) => {
    if (!originalImage) return;
    
    setSelectedEra(era);
    setStep('processing');
    setError(null);

    try {
      const result = await generateTimeTravelImage(originalImage, era);
      setGeneratedImage(result);
      setStep('result');
    } catch (err) {
      console.error(err);
      setError("The time machine malfunctioned. Please try again or check your API key.");
      setStep('select-era');
    }
  };

  const resetApp = () => {
    setStep('intro');
    setOriginalImage(null);
    setGeneratedImage(null);
    setSelectedEra(null);
    setError(null);
  };

  const tryAnotherEra = () => {
    setStep('select-era');
    setGeneratedImage(null);
    setSelectedEra(null);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-violet-500 selection:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={resetApp}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">ChronoLens</span>
          </div>
          
          <div className="text-sm text-gray-400 hidden sm:block">
             Powered by Gemini 2.5
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 px-6 min-h-screen flex flex-col items-center">
        
        {/* Intro / Hero */}
        {step === 'intro' && (
          <div className="text-center max-w-4xl mx-auto animate-fadeIn">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-medium">
              ✨ Experience History Reimagined
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Travel Through Time <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400">
                With One Selfie
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Upload your photo and let our AI transport you to ancient civilizations, 
              medieval castles, or cyberpunk futures with photorealistic precision.
            </p>
            
            <UploadSection onImageSelected={handleImageSelected} />
            
            {/* Feature Grid Mini */}
            <div className="grid grid-cols-3 gap-4 mt-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
               {['ancient-egypt', 'cyberpunk', 'viking-age'].map((id, i) => (
                 <div key={id} className="h-24 md:h-32 rounded-lg bg-white/5 border border-white/10 overflow-hidden relative">
                    {/* Visual placeholders for decorative purposes */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${i === 0 ? 'from-yellow-900' : i === 1 ? 'from-purple-900' : 'from-slate-800'} to-black opacity-60`}></div>
                 </div>
               ))}
            </div>
          </div>
        )}

        {/* Era Selection */}
        {step === 'select-era' && (
          <div className="w-full animate-fadeIn">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Choose Your Destination</h2>
              <p className="text-gray-400">Select a timeline to transport your digital self.</p>
              {error && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 inline-block">
                  {error}
                </div>
              )}
            </div>
            <EraSelector onSelectEra={handleEraSelected} />
          </div>
        )}

        {/* Processing */}
        {step === 'processing' && (
          <LoadingScreen />
        )}

        {/* Result */}
        {step === 'result' && originalImage && generatedImage && selectedEra && (
          <ResultDisplay 
            originalImage={originalImage}
            generatedImage={generatedImage}
            era={selectedEra}
            onReset={tryAnotherEra}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} ChronoLens. Built with Google Gemini API.</p>
      </footer>
    </div>
  );
};

export default App;