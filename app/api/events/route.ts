import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'site-content.json');
    const content = await readFile(filePath, 'utf8');
    const data = JSON.parse(content);
    return NextResponse.json({ events: data.events || [] });
  } catch (error) {
    return NextResponse.json({ events: [] }, { status: 500 });
  }
} 