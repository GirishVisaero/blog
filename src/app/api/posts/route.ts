import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const posts = await prisma.post.findMany();

    return NextResponse.json({
      status: "success",
      posts,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        message: "Something went wrong!",
      },
      { status: 500 }
    );
  }
}
