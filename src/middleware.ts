import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    console.log(path);

    const isPublicPath = path === '/login' || path === '/sign-up' || path === '/';
    const token = request.cookies.get('authToken')?.value || ''

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/profile', request.nextUrl))
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
    
}

export const config = {
    matcher: [
        '/', 
        '/login', 
        '/sign-up', 
        '/profile', 
        '/logout',
        '/app'
    ]
}