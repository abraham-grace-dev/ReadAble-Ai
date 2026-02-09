
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Message, AttachedFile } from "../types";

// Using the Pro model for deep reasoning capabilities
const MODEL_NAME = 'gemini-3-pro-preview';

export const generateResponse = async (
  prompt: string,
  history: Message[],
  file?: AttachedFile
): Promise<string> => {
  // Create instance inside the function to pick up injected API keys immediately
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const contents = history.map(h => ({
    role: h.role,
    parts: [{ text: h.content }]
  }));

  const currentParts: any[] = [];

  if (file) {
    if (file.isBinary) {
      currentParts.push({
        inlineData: {
          mimeType: file.type,
          data: file.data.split(',')[1] || file.data,
        },
      });
      currentParts.push({ 
        text: `The attached file is "${file.name}". Solve this specific user request using the file context: "${prompt}". DO NOT summarize the whole file again. Answer only the question asked.` 
      });
    } else {
      currentParts.push({ 
        text: `CONTEXT FILE [Name: ${file.name}]:\n\n${file.data}\n\nUSER QUESTION: ${prompt}\n\nTask: Answer the USER QUESTION using the CONTEXT FILE. Be specific. Do not provide a general summary of the file unless asked.` 
      });
    }
  } else {
    currentParts.push({ text: prompt });
  }

  contents.push({
    role: 'user',
    parts: currentParts
  });

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: contents,
      config: {
        thinkingConfig: { thinkingBudget: 32768 },
        systemInstruction: "You are ReadAble Gemini, a specialized document reasoning agent. When a user asks a question about a file, your job is to provide a direct, evidence-based answer. NEVER repeat a general summary of the file if the user is asking a specific question. Use your reasoning tokens to analyze the document structure and find the exact information requested.",
      }
    });

    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // Standardize error reporting for quota issues
    if (error.message?.includes("429") || error.message?.includes("RESOURCE_EXHAUSTED")) {
      throw new Error("QUOTA_EXHAUSTED: You've reached the reasoning limit for your current API key. Please try again later or use a project with higher limits.");
    }
    throw new Error(error.message || "Failed to get a response from the reasoning engine.");
  }
};
