import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("accessToken")?.value;

    const isAuth = !!token;
    const { pathname } = request.nextUrl;

    // если пользователь не авторизован и заходит на /profile или вложенные
    if (!isAuth && pathname.startsWith("/profile")) {
        const loginUrl = new URL("/auth", request.url); // или '/login'
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

// Задаём пути, для которых сработает middleware
export const config = {
    matcher: ["/profile/:path*"],
};
