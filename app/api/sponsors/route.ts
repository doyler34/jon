import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'site-content.json');
    const content = await readFile(filePath, 'utf8');
    const data = JSON.parse(content);
    return NextResponse.json({ sponsors: data.sponsors || [] });
  } catch (error) {
    console.error('Failed to fetch sponsors:', error);
    return NextResponse.json({ sponsors: [] }, { status: 500 });
  }
} 