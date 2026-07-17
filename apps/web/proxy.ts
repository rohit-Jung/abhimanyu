import { auth } from "@abhimanyu/services"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (
    (request.url == "/signin" || request.url == "/signup") &&
    session?.user.id
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  if (!session) {
    return NextResponse.redirect(new URL("/signin", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard", "/signin"], // Specify the routes the middleware applies to
}
