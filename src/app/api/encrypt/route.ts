import { NextRequest, NextResponse } from 'next/server';
import { randomBytes, createCipheriv, pbkdf2Sync } from 'crypto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const text = formData.get('text') as string;
  const password = formData.get('password') as string;

  if (!text || !password || text.length > 255) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const salt = randomBytes(16).toString('hex');
  const key = pbkdf2Sync(password, salt, 100000, 32, 'sha256');
  const iv = randomBytes(16);
  const cipher = createCipheriv('aes-256-cbc', key, iv);

  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);

  const entry = await prisma.entry.create({
    data: {
      encryptedData: encrypted.toString('hex'),
      iv: iv.toString('hex'),
      salt,
    },
  });

  // Construct an absolute URL
  const baseUrl = req.nextUrl.origin;
  return NextResponse.redirect(`${baseUrl}/${entry.id}`);
}