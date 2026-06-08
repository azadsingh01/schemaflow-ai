import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({
        message: "Invalid password",
      });
    }

    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      message: "Something went wrong",
    });
  }
}