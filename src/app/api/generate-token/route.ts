import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET = "this is a secret";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, username } = body;

  // Generate JWT token on the server side
  const token = jwt.sign({ email, username }, SECRET);

  return NextResponse.json({ token });
}
