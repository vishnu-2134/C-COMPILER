import { GoogleGenAI } from "@google/genai";
import { COMPILER_SYSTEM_INSTRUCTION } from "../constants";
import { CompilationResult } from "../types";

// Initialize the client
// The API key must be obtained exclusively from the environment variable process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const compileAndRunCode = async (
  code: string,
  stdin: string
): Promise<CompilationResult> => {
  const startTime = performance.now();

  try {
    const prompt = `
SOURCE CODE:
${code}

STANDARD INPUT:
${stdin || "<No Input>"}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: COMPILER_SYSTEM_INSTRUCTION,
        temperature: 0.1, // Low temperature for deterministic output
      },
    });

    const endTime = performance.now();
    const duration = Math.round(endTime - startTime);
    const outputText = response.text || "";

    // Basic heuristic to detect if the output looks like a GCC error
    // Real GCC errors usually start with "file.c:" or "error:" or "warning:"
    // Since we don't have a real file system, Gemini usually outputs "source.c:line:..." or just the error.
    const isError = outputText.toLowerCase().includes("error:") || 
                    outputText.toLowerCase().includes("warning:") ||
                    outputText.includes("segmentation fault");

    return {
      output: outputText.trim(),
      isError: isError,
      executionTime: duration,
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      output: "Detailed Error: Failed to connect to the AI Compiler service. Please check your connection.",
      isError: true,
    };
  }
};
