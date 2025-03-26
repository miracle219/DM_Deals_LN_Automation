import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Only run middleware for protected routes
  if ((pathname.startsWith('/dashboard') || pathname.startsWith('/admin/dashboard'))
      && !pathname.includes('/_next')) {

    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // No token/session, redirect to login
    if (!token) {
      const loginPath = pathname.startsWith('/admin') ? '/admin/login' : '/login';
      const url = new URL(loginPath, request.url);
      url.searchParams.set('callbackUrl', encodeURI(pathname));
      return NextResponse.redirect(url);
    }

    // Handle admin routes
    if (pathname.startsWith('/admin/dashboard')) {
      // If user is not an admin, redirect to customer dashboard
      if (token.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
      // Admin is authorized, proceed
      return NextResponse.next();
    }

    // Handle customer dashboard routes
    if (pathname.startsWith('/dashboard')) {
      // If user is an admin, redirect to admin dashboard
      if (token.role === 'ADMIN') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }

      // Check if onboarding is completed for customer users
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
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/dashboard/:path*', '/onboarding'],
};