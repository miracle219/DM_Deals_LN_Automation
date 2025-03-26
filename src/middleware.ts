import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {

  const pathname = request.nextUrl.pathname;

  // Only intercept dashboard routes (not onboarding, login, etc.)
  if (pathname.startsWith('/dashboard') && !pathname.includes('/_next')) {

    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // No token/session, redirect to login
    if (!token) {
      const url = new URL('/login', request.url);
      url.searchParams.set('callbackUrl', encodeURI(pathname));
      return NextResponse.redirect(url);
    }

    // Check if onboarding is completed by verifying all required fields are present
    const hasCompletedOnboarding =
      // Role should be defined and should not be the default CUSTOMER
      (token.role && token.role !== "CUSTOMER") &&
      // Referral source should be defined
      token.referralSource &&
      // Company should be defined
      token.company;

    // If onboarding is needed and not already on the onboarding page
    if (!hasCompletedOnboarding && pathname !== '/onboarding') {
      // Redirect to onboarding
      const url = new URL('/onboarding', request.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};