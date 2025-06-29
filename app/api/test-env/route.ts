import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    hasAdminPassword: !!process.env.ADMIN_PASSWORD,
    adminPasswordLength: process.env.ADMIN_PASSWORD?.length || 0,
    hasJwtSecret: !!process.env.JWT_SECRET,
  });
} 