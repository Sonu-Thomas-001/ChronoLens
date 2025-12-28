export interface Era {
  id: string;
  name: string;
  description: string;
  promptModifier: string;
  imagePlaceholder: string;
  color: string;
}

export type AppStep = 'intro' | 'upload' | 'select-era' | 'processing' | 'result';

export interface GeneratedImage {
  original: string; // Base64
  generated: string; // Base64 or URL
  era: Era;
}

export interface ProcessingState {
  status: 'idle' | 'uploading' | 'generating' | 'complete' | 'error';
  message?: string;
}