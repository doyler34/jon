import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of public paths that don't require authentication
const PUBLIC_PATHS = [
  '/api/auth/login',
  '/api/auth/logout',
  '/api/test-env',
  '/api/admin/content',
  '/api/events',
  '/api/sponsors',
  '/api/upload',
  '/api/cookies/preferences',
  '/privacy-policy',
  '/terms-of-use',
  '/cookie-policy',
  '/favicon.ico',
  '/_next',
  '/api/_next',
  '/studio-portal-2024/login',
]

// List of admin-only paths that require authentication
const ADMIN_PATHS = [
  '/studio-portal-2024',
  '/api/admin',
]

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /studio-portal-2024, /studio-portal-2024/events)
  const path = request.nextUrl.pathname

  // Debug logging
  console.log('Middleware processing:', {
    path,
    method: request.method,
    hasAdminToken: !!request.cookies.get('admin_token'),
    nodeEnv: process.env.NODE_ENV
  });

  // Allow public paths
  if (PUBLIC_PATHS.some(publicPath => path.startsWith(publicPath))) {
    console.log('Allowing public path:', path);
    return NextResponse.next()
  }

  // Check for admin routes
  if (ADMIN_PATHS.some(adminPath => path.startsWith(adminPath))) {
    const token = request.cookies.get('admin_token')?.value

    if (!token) {
      console.log('No admin token found, redirecting to login');
      // If accessing admin UI, redirect to login
      if (path.startsWith('/studio-portal-2024')) {
        return NextResponse.redirect(new URL('/studio-portal-2024/login', request.url))
      }
      // If accessing admin API, return unauthorized
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // For now, just check if token exists (JWT verification will be done in API routes)
    console.log('Admin token found, allowing access');
    return NextResponse.next()
  }

  // For all other routes (main website), check if user is authenticated
  // Allow all users to access main site
  return NextResponse.next()
} 