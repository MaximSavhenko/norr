import { NextRequest, NextResponse } from 'next/server'

import { EnumTokens } from './services/auth-token.service'

export async function middleware(req: NextRequest) {
	const { url, cookies } = req
	const isAuthPage = url.includes('/auth')
	const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value

	if (isAuthPage && refreshToken) {
		return NextResponse.redirect(new URL('/', url))
	}

	if (isAuthPage) {
		return NextResponse.next()
	}

	if (!refreshToken) {
		return NextResponse.redirect(new URL('/auth', url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: [ '/','/dashboard/:path*', '/auth', '/auth/:path*']
}
