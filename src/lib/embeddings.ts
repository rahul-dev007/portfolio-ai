// Gemini-only setup
// Embeddings temporarily disabled (no OpenAI key)

export async function embedText(_text: string): Promise<number[]> {
  // return empty vector so app never crashes
  return [];
}
