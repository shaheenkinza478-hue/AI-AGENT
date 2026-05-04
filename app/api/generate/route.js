import { codeStore } from "@/lib/generated-store";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id || !codeStore.has(id)) {
    return new Response(JSON.stringify({ error: "Code not found" }), { status: 404 });
  }

  const { code } = codeStore.get(id);
  return new Response(JSON.stringify({ code }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}