import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { decrypt } from '@/lib/session'
 
// 1. Specify protected and public routes
const protectedRoutes = ['/addjob']
const publicRoutes = ['/login', '/']
 
export default async function middleware(req: NextRequest) {
    console.log("in middleware")
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
 
  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
  if(session){
    console.log("valid session")
  }
  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
 
  if (
    session?.userId &&
    req.nextUrl.pathname.startsWith('/login')
  ) {
    return NextResponse.redirect(new URL('/logout', req.nextUrl))
  }
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}