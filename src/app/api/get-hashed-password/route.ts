import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';


export async function POST(request: Request) {
  const body = await request.json();
  const { password } = body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  return NextResponse.json({ hashedPassword });
}
