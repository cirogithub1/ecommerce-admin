// protect all pages
// export { default } from "next-auth/middleware"

// protect individual pages
// export const config = { matcher: ["/api/orders", "/api/categories", "/products", "/orders", "/catogories"] }

import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log("/[...hextauth.js]/ req.nextauth", req.nextauth)
		if (
			req.nextUrl.pathname === "/orders" &&
			req.nextauth.token?.role !== "admin"
		) {
			// return NextResponse.redirect("/admin")
			return new NextResponse("You are not authorized to view this page")
		}		
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === "admin",
    },
  }
)

export const config = { matcher: ["/orders"] }