import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import { hash, compare } from "bcryptjs";
import { NextResponse } from "next/server";
import jwt, { Secret } from "jsonwebtoken";

export async function POST(req: Request) {
  // console.log("working");
  try {
    const body = (await req.json()) as unknown as {
      email: string;
      password: string;
    };
    console.log("body>>", body);
    let password = await hash(body.password, 12);
    console.log("password >>", password);
    const user = (await prisma.user.findUnique({
      where: { email: body.email },
      select: {
        id: true,
        name: true,
        email: true,
        // image: true,
        password: true,
      },
    })) as User;
    const matchPass = await compare(body.password, user.password);
    let payload = user;

    // console.log(process.env.ACCESS_TOKEN_PRIVATE_KEY);
    // console.log(process.env.REFRESH_TOKEN_PRIVATE_KEY);
    var d = new Date();
    d.setTime(d.getTime() + 3 * 24 * 60 * 60 * 1000 ); // 30 min expiry time
    // console.log(d.valueOf());
    console.log(d.valueOf())

    if (user && matchPass) {
      let token = jwt.sign(
        {
          name: payload.name,
          email: payload.email,
          login_provider: payload.login_provider,
        },
        process.env.ACCESS_TOKEN_PRIVATE_KEY as Secret,
        {
          expiresIn: d.valueOf(), // 1 year in seconds
        }
      );

      // console.log(token)

      // access token
      const refreshToken = jwt.sign(
        { name: payload.name, email: payload.email, id: payload.id },
        process.env.REFRESH_TOKEN_PRIVATE_KEY as Secret,
        { expiresIn: "30d" }
      );

      await prisma.user.update({
        where: {
          email: body.email,
        },
        data: {
          access_token: token,
          refresh_token: refreshToken,
          expires_at: d.valueOf(),
        },
      });

      return NextResponse.json({
        user,
        access_token: token,
        refresh_token: refreshToken,
        expires_at: d.valueOf(),
      });
    } else {
      console.log("incorrect credentials");
      return NextResponse.json(
        {
          status: "error",
          message: "Invalid credentials",
        },
        { status: 401 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({
      status: "error",
      message: error.message,
    });
  }
}
// throw new Error(
//   `The HTTP ${req.method} method is not supported at this route.`,
// );
