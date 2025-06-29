import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

if (process.env.NODE_ENV === 'production' && !process.env.ADMIN_PASSWORD) {
  throw new Error('FATAL: ADMIN_PASSWORD environment variable is required in production.');
}
if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
  throw new Error('FATAL: JWT_SECRET environment variable is required in production.');
}

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-this';

// Simple in-memory rate limiter (per IP)
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5; // 5 attempts
const loginAttempts: { [ip: string]: { count: number; firstAttempt: number } } = {};

export async function POST(request: Request) {
  // Get IP address (works for most deployments, but may need adjustment for proxies)
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();

  // Rate limiting logic
  if (!loginAttempts[ip] || now - loginAttempts[ip].firstAttempt > RATE_LIMIT_WINDOW) {
    loginAttempts[ip] = { count: 1, firstAttempt: now };
  } else {
    loginAttempts[ip].count++;
    if (loginAttempts[ip].count > RATE_LIMIT_MAX) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again later.' },
        { status: 429 }
      );
    }
  }

  try {
    const { password } = await request.json();

    // More detailed error checking
    if (!process.env.ADMIN_PASSWORD) {
      console.error('ADMIN_PASSWORD environment variable is not set');
      return NextResponse.json(
        { error: 'Server configuration error: Admin password not set' },
        { status: 500 }
      );
    }

    // Debug logging (remove in production)
    console.log('Attempting login with:', {
      receivedPasswordLength: password?.length || 0,
      actualPasswordLength: process.env.ADMIN_PASSWORD.length,
      passwordsMatch: password === process.env.ADMIN_PASSWORD,
      nodeEnv: process.env.NODE_ENV
    });

    // Verify password with strict equality
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { role: 'admin' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Set HTTP-only cookie with the token
    const response = NextResponse.json(
      { success: true },
      { status: 200 }
    );

    // Determine if we should use secure cookies based on environment
    const isSecure = process.env.NODE_ENV === 'production' && 
                     (request.headers.get('x-forwarded-proto') === 'https' || 
                      request.headers.get('x-forwarded-ssl') === 'on');

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: isSecure,
      sameSite: 'lax', // Changed from 'strict' to 'lax' for better compatibility
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    console.log('Login successful, cookie set with secure:', isSecure);
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 