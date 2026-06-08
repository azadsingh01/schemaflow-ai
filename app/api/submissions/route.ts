import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET() {
  const submissions = await prisma.submission.findMany({
    include: {
      app: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(submissions);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const submission = await prisma.submission.create({
      data: {
        data: body,
        appId: "cmq3wz86100043k5ai4n15pf2",
      },
    });

    return NextResponse.json(submission);
  } catch (error) {
    console.error("FULL ERROR =>", error);

    return NextResponse.json(
      { error: "Failed to save submission" },
      { status: 500 }
    );
  }
}

