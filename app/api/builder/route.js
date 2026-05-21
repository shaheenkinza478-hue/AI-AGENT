import { generateFromPrompt } from "@/lib/ai-builder";
import { codeStore } from "@/lib/generated-store";
import { v4 as uuidv4 } from "@/lib/utils";
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `You are a world‑class web designer and front‑end developer. Generate a complete, production‑ready HTML page based on the user's description. 

Requirements:
- Use Tailwind CSS (CDN: <script src="https://cdn.tailwindcss.com"></script>)
- Add minimal vanilla JavaScript for mobile menu toggle and smooth scroll (include it inside the page).
- The page must include: a responsive navigation, a stunning hero section, a features/services section, an about section, a testimonials or reviews section, a call‑to‑action, and a footer.
- Add at least one extra relevant section (e.g., pricing, team, FAQ, stats, timeline) based on the business type.
- Use semantic HTML5, emojis for icons (or simple SVGs), and placeholder images from unsplash or via.placeholder.com.
- Design should be modern, with gradients, soft shadows, and smooth CSS transitions.
- The whole page must be self‑contained and ready to open in a browser.
- Output ONLY the raw HTML code, no explanations, no markdown syntax.`;

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