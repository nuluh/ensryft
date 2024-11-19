import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { createDecipheriv, pbkdf2Sync } from 'crypto';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const id = formData.get('id') as string;
  const password = formData.get('password') as string;

  if (!id || !password) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const entry = await prisma.entry.findUnique({ where: { id } });

  if (!entry) {
    return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
  }

  const key = pbkdf2Sync(password, entry.salt, 100000, 32, 'sha256');
  const iv = Buffer.from(entry.iv, 'hex');
  const decipher = createDecipheriv('aes-256-cbc', key, iv);

  try {
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(entry.encryptedData, 'hex')),
      decipher.final(),
    ]);

    return NextResponse.json({ decryptedText: decrypted.toString('utf8') });
  } catch {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
  }
}
