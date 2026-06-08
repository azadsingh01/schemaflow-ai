import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateSchema } from "@/lib/validator";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const errors = validateSchema(body.schema);

if (errors.length > 0) {
  return NextResponse.json(
    { errors },
    { status: 400 }
  );
}

    console.log(body);
    const app = await prisma.app.create({
      data: {
        name: body.name || "My App",
        description: body.description || "",
        schemaJson: body.schema,
        userId: body.userId,
      },
    });

    return NextResponse.json(app);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to create app" },
      { status: 500 }
    );
  }
}