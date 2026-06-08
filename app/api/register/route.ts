import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import {prisma} from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      message: "Something went wrong",
    });
  }
}