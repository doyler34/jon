import { NextResponse } from 'next/server'
import { writeFile, readFile } from 'fs/promises'
import path from 'path'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-this';

// Helper function to read content
async function readContent() {
  const filePath = path.join(process.cwd(), 'data', 'site-content.json')
  const content = await readFile(filePath, 'utf8')
  return JSON.parse(content)
}

// Helper function to write content
async function writeContent(content: any) {
  const filePath = path.join(process.cwd(), 'data', 'site-content.json')
  await writeFile(filePath, JSON.stringify(content, null, 2))
}

// Helper function to verify token
function verifyToken(request: Request) {
  const token = request.headers.get('Cookie')?.split(';')
    .find(c => c.trim().startsWith('admin_token='))
    ?.split('=')[1];

  if (!token) {
    throw new Error('No token provided');
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export async function GET() {
  try {
    const content = await readContent()
    return NextResponse.json(content)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read content' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    // Token verification is now handled by middleware
    const content = await request.json()
    await writeContent(content)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 })
  }
} 