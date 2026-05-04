export async function POST(request) {
  const { messages } = await request.json();
  const lastUserMsg = messages.filter((m) => m.role === "user").pop();

  if (!lastUserMsg) {
    return new Response(JSON.stringify({ reply: "Hello! How can I help you today?" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const userText = lastUserMsg.content.trim();
  const lowerText = userText.toLowerCase();

  // Detect known languages (we'll expand this list, but any language gets a friendly response)
  const knownLanguages = ["urdu", "hindi", "spanish", "arabic", "french", "german"]; // etc.
  let detectedLang = "en";

  // Simple detection (can be improved)
  if (/[\u0600-\u06FF]/.test(userText)) detectedLang = "urdu";
  else if (/[\u0900-\u097F]/.test(userText)) detectedLang = "hindi";
  else if (/[áéíóúñü¿¡]/i.test(userText)) detectedLang = "spanish";
  else if (/[\u0621-\u064A]/.test(userText)) detectedLang = "arabic";
  // ... more languages

  // Simulate AI thinking
  await new Promise((r) => setTimeout(r, 800));

  let reply = "";

  // If language is not English and we don't have a specific handler, we'll apologize and ask to use English
  if (detectedLang !== "en" && !knownLanguages.includes(detectedLang)) {
    reply = "😔 I'm sorry, I'm still learning this language. Please try English or another language I might understand better. I'm here to help!";
    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Now handle known languages
  switch (detectedLang) {
    case "urdu":
      if (lowerText.includes("سلام")) reply = "وعلیکم السلام! میں آپ کی کیا مدد کر سکتا ہوں؟";
      else if (lowerText.includes("موسم")) reply = "معذرت، میرے پاس موسم کی معلومات نہیں ہیں۔";
      else reply = "میں ایک AI اسسٹنٹ ہوں، پروگرامنگ، سائنس، تعلیم اور مشورے میں مدد کر سکتا ہوں۔ آپ کیا پوچھنا چاہیں گے؟";
      break;
    case "hindi":
      if (lowerText.includes("नमस्ते")) reply = "नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?";
      else if (lowerText.includes("मौसम")) reply = "माफ़ कीजिए, मेरे पास मौसम की जानकारी नहीं है।";
      else reply = "मैं कोडिंग, सामान्य ज्ञान और रचनात्मक लेखन में सहायता कर सकता हूँ। बताइए।";
      break;
    case "spanish":
      if (lowerText.includes("hola")) reply = "¡Hola! ¿En qué puedo ayudarte?";
      else reply = "Soy un asistente AI que puede ayudarte con código, conocimiento general y más. Dime qué necesitas.";
      break;
    case "arabic":
      reply = "مرحباً! كيف يمكنني مساعدتك اليوم؟";
      break;
    // English (default)
    default:
      if (lowerText.includes("joke")) {
        reply = "Why do programmers prefer dark mode? Because light attracts bugs! 😄 Want another?";
      } else if (lowerText.includes("weather")) {
        reply = "I don't have real‑time weather data, but I can help you build a weather widget using an API. Would you like that?";
      } else if (lowerText.includes("hello") || lowerText.includes("hi")) {
        reply = "Hello! 👋 How can I assist you today? Feel free to ask me anything.";
      } else if (lowerText.includes("make") && (lowerText.includes("website") || lowerText.includes("portfolio"))) {
        reply = "Absolutely! I can help you create a stunning portfolio website. Try using our **Builder** page — describe what you need and get clean HTML/Tailwind code instantly. Would you like me to guide you?";
      } else if (lowerText.includes("react component")) {
        reply = "Here's a simple React component:\n\n```jsx\nfunction Greeting({ name }) {\n  return <h1>Hello, {name}!</h1>;\n}\n```\n\nYou can use it like `<Greeting name=\"Alex\" />`.";
      } else if (lowerText.includes("study tip")) {
        reply = "📚 Use active recall, spaced repetition, and teach someone else. Want a personalized plan?";
      } else if (lowerText.includes("business plan")) {
        reply = "A business plan includes executive summary, market analysis, products/services, funding request... I can help draft one. Which industry?";
      } else if (lowerText.includes("who are you")) {
        reply = "I'm your AI assistant, here to help with coding, learning, and creative tasks. What can I do for you?";
      } else {
        reply = `You asked: "${userText}"\n\nThat's an interesting topic! I can help with code, writing, learning new things, or just a friendly chat. Tell me more!`;
      }
  }

  return new Response(JSON.stringify({ reply }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}