import Cookies from 'js-cookie'

export enum EnumTokens {
	'ACCESS_TOKEN' = 'accessToken',
	'REFRESH_TOKEN' = 'refreshToken'
}

export const getAccessToken = () => {
	const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)
	return accessToken || null
}

export const saveTokenInStorage = (accessToken: string) => {
	Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
		sameSite: 'strict',
		expires: 1,
		...(process.env.NODE_ENV === 'development' ? { domain: 'localhost' } : {})
	})
}

export const removeTokenFromStorage = () => {
	Cookies.remove(EnumTokens.ACCESS_TOKEN)
}
