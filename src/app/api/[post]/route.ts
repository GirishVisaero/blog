import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("post") as string;
    // console.log("postId query", searchParams.get('post'));

    const postData = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    return NextResponse.json({
      status: "success",
      postData,
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

export async function POST(req: Request) {
  try {


    // const body = await req.json();
    // const { name, title, content } = body as {
    //   name: string;
    //   title: string;
    //   content: string;
    // };
    // console.log(await req.json());

    const { title, content, name } = await req.json() as {
      title: string;
      content: string;
      name: string;
    };
    console.log(title);
    
    const session = await getServerSession(authOptions);
    console.log("session", session);

    // console.log('prisma', prisma)
    const post = await prisma.post.create({
      data: {
        name,
        title,
        content,
        author: { connect: { email: session?.user?.email as string } },
      },
    });

    return NextResponse.json({ post }, { status: 201 });
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

// DELETE /api/post/:id
export async function DELETE(req: NextApiRequest) {
  const postId = req.query.id as string;

  const session = await getSession({ req });

  if (req.method === "DELETE") {
    if (session) {
      const post = await prisma.post.delete({
        where: { id: postId },
      });
      return NextResponse.json({ post });
    } else {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
