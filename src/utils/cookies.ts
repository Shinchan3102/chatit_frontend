import { serialize } from "cookie";

export function setCookie(name: string, value: string, options: any = {}) {
  const cookieStr = serialize(name, JSON.stringify(value), {
    path: '/',
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    ...options,
  });
  return cookieStr;
}

export function getCookie(req: Request, name: string) {
  const cookieHeader = req.headers.get('cookie');
  if (!cookieHeader) return null;
  
  const cookies = Object.fromEntries(
    cookieHeader
      .split(';')
      .map((cookie) => cookie.trim().split('='))
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
  
  return cookies[name] ? JSON.parse(cookies[name]) : null;
}
