import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

interface UserPayload {
  id: number;
  email: string;
}

export function generateToken(user: UserPayload): string {
  return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
}

export function verifyToken(token: string): UserPayload | null {
  try {
    return jwt.verify(token, SECRET_KEY) as UserPayload;
  } catch (error) {
    return null;
  }
}