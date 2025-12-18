import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  if (!process.env.GOOGLE_GENERATION_AI_API_KEY) {
    return new Response("GOOGLE_GENERATION_AI_API_KEY is not set", { status: 500 });
  }

  const { messages } = await req.json();
  const result = streamText({
    model: google("gemini-1.5-flash"),
    messages,
  });
  return result.toDataStreamResponse();
}