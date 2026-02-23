import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that don't require authentication
const publicRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/api/auth/login',
  '/api/auth/register',
];

// Routes that require admin role
const adminRoutes = [
  '/admin',
  '/users',
  '/depots/create',
  '/settings',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check for token
  const token = request.cookies.get('auth-storage')?.value;
  
  if (!token) {
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  // Parse token to check role (simplified - you might want to verify JWT)
  try {
    const authData = JSON.parse(decodeURIComponent(token));
    const user = authData?.state?.user;
    
    // Check admin routes
    if (adminRoutes.some(route => pathname.startsWith(route))) {
      if (!user || user.role !== 'admin') {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    }
  } catch (error) {
    // If token parsing fails, redirect to login
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};