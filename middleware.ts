import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	const isLoggedIn = request.cookies.get('userId');
	const isProtected = request.nextUrl.pathname.startsWith('/dashboard');

	if (!isLoggedIn && isProtected) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/dashboard/:path*'],
};
