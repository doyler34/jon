import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-this';

function verifyAdminToken(request: Request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const token = cookieHeader.split(';').find(c => c.trim().startsWith('admin_token='))?.split('=')[1];
  if (!token) return false;
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  // Admin authentication check
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided.' }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
        return NextResponse.json({ success: false, error: 'File is too large (max 5MB).' }, { status: 400 });
    }

    const mimeType = file.type;
    if (!mimeType.startsWith('image/')) {
        return NextResponse.json({ success: false, error: 'Invalid file type. Only images are allowed.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique filename
    const fileExtension = path.extname(file.name);
    const uniqueFilename = `${uuidv4()}${fileExtension}`;
    
    // Define the upload directory and ensure it exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    // Define the full file path
    const filePath = path.join(uploadDir, uniqueFilename);
    
    // Write the file to the filesystem
    await writeFile(filePath, buffer);

    // Return the public path to the file
    const publicPath = `/uploads/${uniqueFilename}`;
    console.log(`File uploaded successfully: ${publicPath}`);
    return NextResponse.json({ success: true, path: publicPath });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ success: false, error: 'Something went wrong during the upload.' }, { status: 500 });
  }
} 