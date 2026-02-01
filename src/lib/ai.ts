const SYSTEM_PROMPT = `You are "Rahul's Portfolio Assistant".
Answer concisely in the user's language (Bengali if the question is in Bengali; otherwise English).
If unsure, say you don't know.`;

let lastCall = 0;

function normalizeGeminiModel(raw: string) {
  return raw.startsWith("models/") ? raw.slice(7) : raw;
}

export async function generateText(
  question: string,
  context?: string
): Promise<string> {
  // 🔒 simple local rate limit (NO THROW)
  const now = Date.now();
  if (now - lastCall < 3000) {
    console.warn("Local AI rate limit hit");
    return ""; // graceful fallback
  }
  lastCall = now;

  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    console.warn("GEMINI_API_KEY missing");
    return "";
  }

  const rawModel = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const model = normalizeGeminiModel(rawModel);

  const userText = context
    ? `Question: ${question}\n\nContext:\n${context}`
    : question;

  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
      model
    )}:generateContent?key=${encodeURIComponent(key)}`;

  let res: Response;

  try {
    res = await fetch(url, {
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
  } catch (err) {
    console.error("Gemini fetch failed:", err);
    return "";
  }

  // ❌ NO THROW HERE
  if (!res.ok) {
    const errText = await res.text();
    console.error("Gemini API error:", errText);
    return "";
  }

  const data = await res.json();

  return (
    data?.candidates?.[0]?.content?.parts
      ?.map((p: any) => p?.text)
      .filter(Boolean)
      .join("") ?? ""
  );
}
