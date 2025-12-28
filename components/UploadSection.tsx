import React, { useCallback, useState } from 'react';
import { Button } from './Button';

interface UploadSectionProps {
  onImageSelected: (base64: string) => void;
}

export const UploadSection: React.FC<UploadSectionProps> = ({ onImageSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPEG, PNG).');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      setError('File size too large. Please upload an image under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onImageSelected(e.target.result as string);
      }
    };
    reader.onerror = () => setError('Failed to read file');
    reader.readAsDataURL(file);
  }, [onImageSelected]);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }, [handleFile]);

  return (
    <div className="w-full max-w-2xl mx-auto animate-float">
      <div 
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300
          ${isDragging 
            ? 'border-violet-500 bg-violet-500/10 scale-102' 
            : 'border-white/20 hover:border-white/40 bg-white/5'}
        `}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="mb-6 flex justify-center">
          <svg className="w-16 h-16 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        
        <h3 className="text-2xl font-bold mb-3">Upload your photo</h3>
        <p className="text-gray-400 mb-8">
          Drag and drop your best selfie here, or click to browse.<br/>
          <span className="text-sm text-gray-500">Supported formats: JPG, PNG (Max 5MB)</span>
        </p>

        <div className="relative inline-block">
          <input 
            type="file" 
            accept="image/*" 
            onChange={onInputChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <Button size="lg" variant="primary">
            Choose File
          </Button>
        </div>

        {error && (
          <div className="mt-4 text-red-400 bg-red-400/10 py-2 px-4 rounded-lg inline-block text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};