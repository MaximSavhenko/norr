import { IAuthForm, IAuthResponse } from '@/types/auth.type'

import { axiosClassic } from '@/api/interceptors'

import {
	removeTokenFromStorage,
	saveTokenInStorage
} from './auth-token.service'

export const authService = {
	async main(type: 'login' | 'register', data: IAuthForm) {
		const reponse = await axiosClassic.post<IAuthResponse>(
			`/auth/${type}`,
			data
		)

		if (reponse.data.accessToken) {
			saveTokenInStorage(reponse.data.accessToken)
		}

		return reponse
	},

	async getNewToken() {
		const response = await axiosClassic.post<IAuthResponse>(
			'/auth/login/access-token'
		)

		if (response.data.accessToken) {
			saveTokenInStorage(response.data.accessToken)
		}

		return response
	},

	async logout() {
		const response = await axiosClassic.post<boolean>('/auth/logout')
		if (response.data) removeTokenFromStorage()

		return response
	}
}
