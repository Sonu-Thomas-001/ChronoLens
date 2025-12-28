import { GoogleGenAI } from "@google/genai";
import { Era } from "../types";

const API_KEY = process.env.API_KEY || '';

// Helper to remove data:image/xyz;base64, prefix
const extractBase64 = (dataUrl: string): string => {
  return dataUrl.split(',')[1];
};

export const generateTimeTravelImage = async (
  base64Image: string,
  era: Era
): Promise<string> => {
  if (!API_KEY) {
    throw new Error("API Key is missing. Please set process.env.API_KEY.");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  // Using gemini-2.5-flash-image for balanced speed and quality in image editing/generation
  const model = "gemini-2.5-flash-image";

  const prompt = `Transform the person in this image. ${era.promptModifier}. Ensure the face retains the likeness of the original person but fits naturally into the new environment and style. High quality, photorealistic masterpiece.`;

  try {
    const cleanBase64 = extractBase64(base64Image);

    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            text: prompt,
          },
          {
            inlineData: {
              mimeType: "image/jpeg", // Assuming JPEG for simplicity, or detect from header
              data: cleanBase64,
            },
          },
        ],
      },
    });

    // Extract the generated image
    // The response for image generation usually contains inlineData in the parts
    const parts = response.candidates?.[0]?.content?.parts;
    
    if (!parts) {
      throw new Error("No content generated.");
    }

    // Iterate to find the image part
    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
      }
    }

    throw new Error("No image data found in response.");

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};