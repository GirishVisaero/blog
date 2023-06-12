import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import { compare, hash } from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as unknown as {
      token: string;
    };
    console.log("refresh token >>", body.token);
    
    const data = jwt.decode(body.token) as { id: string, email:string, name:string }
    console.log('data>>', data)

    const user = (await prisma.user.findUnique({
      where: { email: data.email },
      select: {
        login_provider: true,
        name: true,
        email: true,
      },
    })) as User;


    var d = new Date();
    d.setTime(d.getTime() + 3 * 24 * 60 * 60 * 1000) // 30 min expiry time 
    // console.log(d.valueOf()) 

    if (user ) {
      let token = jwt.sign(
        user,
        process.env.ACCESS_TOKEN_PRIVATE_KEY as Secret,
        {
          expiresIn: d.valueOf() , // 1 year in seconds
        }
      );

      // console.log(token)

    
   let datab =    await prisma.user.update({
        where: {
          email: data.email,
        },
        data: {
          access_token: token,
          expires_at: d.valueOf()
        },
      });

      console.log(d.valueOf())
      return NextResponse.json({
        user,
        access_token:  token,
        expires_at: d.valueOf()
      });

    } else {
      console.log("Invalid refrehs token");
      return NextResponse.json(
        {
          status: "error",
          message: "Invalid refrehs token",
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
