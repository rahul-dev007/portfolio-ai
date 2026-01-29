const SYSTEM_PROMPT = `You are "Rahul's Portfolio Assistant".
Answer concisely in the user's language (Bengali if the question is in Bengali; otherwise English).
If unsure, say you don't know.`;

let lastCall = 0;

function normalizeGeminiModel(raw: string) {
  return raw.startsWith("models/") ? raw.slice(7) : raw;
}

export async function generateText(question: string, context?: string) {
  // 🔒 simple rate limit (free tier safe)
  const now = Date.now();
  if (now - lastCall < 3000) {
    throw new Error("RATE_LIMIT_LOCAL");
  }
  lastCall = now;

  const key = process.env.GEMINI_API_KEY!;
  const rawModel = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const model = normalizeGeminiModel(rawModel);

  const userText = context
    ? `Question: ${question}\n\nContext:\n${context}`
    : question;

  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
      model
    )}:generateContent?key=${encodeURIComponent(key)}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: `${SYSTEM_PROMPT}\n\n${userText}` }],
        },
      ],
      generationConfig: { temperature: 0.2 },
    }),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  const data = await res.json();
  return (
    data?.candidates?.[0]?.content?.parts
      ?.map((p: any) => p?.text)
      .filter(Boolean)
      .join("") ?? ""
  );
}
