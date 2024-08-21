import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const cookieValue = request.cookies.get('chatit')?.value;

  let jwtToken: string | null = null;

  if (cookieValue) {
    try {
      const parsedData = JSON.parse(cookieValue);
      jwtToken = parsedData?.jwt || null;
    } catch (error) {
      jwtToken = null;
    }
  }
  const signInUrl = new URL('/sign-in', request.url);
  const homeUrl = new URL('/home', request.url);
  const isHomePage = request.nextUrl.pathname === '/home';
  const isSignInPage = request.nextUrl.pathname === '/sign-in';
  const isSignUpPage = request.nextUrl.pathname === '/sign-up';
  const isHomeWithId = request.nextUrl.pathname.startsWith('/home/');

  console.log(request.nextUrl.pathname);

  if (!jwtToken) {
    if (!isSignInPage && !isSignUpPage) {
      return NextResponse.redirect(signInUrl);
    }
  } else {
    if (!isHomePage && !isHomeWithId) {
      return NextResponse.redirect(homeUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
