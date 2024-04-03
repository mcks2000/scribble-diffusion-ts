// The Replicate webhook is a POST request where the request body is a prediction object.
// Identical webhooks can be sent multiple times, so this handler must be idempotent.

// import { upsertPrediction } from "@/app/lib/prisma/db";
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const prediction = await req.json();
  const id = prediction.id;
  // await upsertPrediction(req.body);

  return NextResponse.json(id)
}
