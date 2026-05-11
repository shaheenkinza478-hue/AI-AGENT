import { generateFromPrompt } from "@/lib/ai-builder";
import { codeStore } from "@/lib/generated-store";
import { v4 as uuidv4 } from "@/lib/utils";

export async function POST(request) {
  try {
    const { prompt, previousCode } = await request.json();
    if (!prompt) {
      return new Response(JSON.stringify({ error: "Prompt is required" }), { status: 400 });
    }

    const code = await generateFromPrompt(prompt, previousCode || null);
    const id = uuidv4();
    codeStore.set(id, { code, prompt, timestamp: Date.now() });

    return new Response(JSON.stringify({ id, code }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Generation failed" }), { status: 500 });
  }
}