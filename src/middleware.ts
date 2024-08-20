import { NextResponse, NextRequest } from 'next/server';
import { getCookie } from './utils/cookies';

export function middleware(request: NextRequest) {
  const userToken = getCookie(request, 'userToken');
  const signInUrl = new URL('/sign-in', request.url);
  const homeUrl = new URL('/', request.url);

  if (!userToken) {
    if (request.nextUrl.pathname !== '/sign-in') {
      return NextResponse.redirect(signInUrl);
    }
  } else {
    if (request.nextUrl.pathname !== '/') {
      return NextResponse.redirect(homeUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/sign-in'],
};
