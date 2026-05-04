/**
 * Mock conversational response generator.
 * Replace with OpenAI API call in production.
 */
export async function getChatResponse(messages) {
  // Simulate API delay
  await new Promise((res) => setTimeout(res, 500));

  const lastUserMsg = messages.filter((m) => m.role === "user").pop();
  if (!lastUserMsg) return "Hello! How can I help you today?";

  const prompt = lastUserMsg.content.toLowerCase();
  if (prompt.includes("hello") || prompt.includes("hi")) {
    return "Hello! How can I assist you?";
  }
  if (prompt.includes("weather")) {
    return "I'm sorry, I don't have real‑time weather access yet. But I can help you build a website!";
  }
  return `You said: "${lastUserMsg.content}". That's an interesting thought. I'm here to chat or help you create websites.`;
}