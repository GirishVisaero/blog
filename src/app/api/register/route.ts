import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { password, ...body } = (await req.json()) as {
      name: string;
      email: string;
      password: string;
    };
    const hashed_password = await hash(password, 12);
    // console.log('prisma', prisma)
    const user = await prisma.user.create({
      data: {
        ...body,
        password: hashed_password,
      },
    });

    return NextResponse.json({ user });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}

// export async function POST(req: Request ) {
//   const body = req.json()
//   let password = await hash(body?.password, 12)
//   console.log('body json>>', body)

//   console.debug("creating user", {
//     ...body,
//     password: password,
//   });
//   const user = await prisma.user.create({
//     data: { ...body, password  },
//   });

//       return NextResponse.json({
//       user
//     });

// }
