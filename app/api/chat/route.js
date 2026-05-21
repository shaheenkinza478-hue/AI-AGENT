const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `You are a friendly, empathetic, and intelligent AI companion named "Aria". Your role is to have meaningful, warm conversations with users on any topic — emotions, life advice, jokes, fun facts, stories, motivation, travel, food, music, philosophy, and more.

Guidelines:
- Always respond in the same language the user writes in (Urdu, Hindi, Roman Urdu, English, Arabic, Spanish, French, German, Japanese, etc.)
- Be concise but genuine — 2 to 5 sentences usually works best
- Show empathy when users are emotional (sad, anxious, lonely, angry)
- Be witty and fun when the mood is light
- If the user asks about coding, programming, HTML, CSS, JavaScript, React, Next.js, Python, or any technical development topic, kindly tell them: "For coding and website generation, head over to our AI Builder at /builder — just describe your idea and get clean code instantly! I'm here for personal conversations 😊"
- Never reveal your underlying model or technical details
- Keep a warm, supportive tone at all times`;

export async function POST(request) {
  try {
    const { messages } = await request.json();
    if (!messages || messages.length === 0) {
      return new Response(
        JSON.stringify({ reply: "Hey! 👋 I'm Aria, your AI companion. What's on your mind?" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.map((m) => ({ role: m.role, content: m.content })),
        ],
        temperature: 0.85,
        max_tokens: 512,
      }),
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(data.error?.message || "Groq API error");
    }

    const reply = data.choices[0].message.content.trim();
    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({
        reply: "I'm having a little trouble connecting right now. Please try again in a moment! 🙏",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
}
