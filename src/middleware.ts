import { withAuth } from "next-auth/middleware";
// export { default } from "next-auth/middleware";




export default withAuth(
    function middleware(req) {
        // console.log("🚀 ~ file: middleware.ts:7 ~ middleware ~ req:", req);
        // return Nextreponse
        // console.log('middleware nextauth token', req.nextauth.token);
        // return NextResponse.rewrite(new URL('/dashboard', req.url));
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                // console.log("🚀 ~ file: middleware.ts:16 ~ req.cookies:", req.cookies);
                // console.log("🚀 ~ file: middleware.ts:17 ~ token:", token, "url", req.url);
                if (token) {
                  // if(req.url.includes('register'))
                  // NextResponse.rewrite(new URL('/', req.url));
                  return true;
                 }
                // else if (req.cookies) return true;
                return false;
            },
        },
    }

);

export const config = {
  // matcher: ["/profile"],
  matcher: ["/((?!register|api|login).*)"],
};
