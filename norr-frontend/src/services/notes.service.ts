import { INoteCreateData, INoteResponse, INoteUpdateData } from '@/types/note.type'

import { axiosWithAuth } from '@/api/interceptors'

export class NoteService {
	private BASE_URL = '/user/notes'
	async getNote() {
		const response = await axiosWithAuth.get<INoteResponse[]>(this.BASE_URL)
		return response
	}

	async getOneNote(id: string) {
		const response = await axiosWithAuth.get<INoteResponse>(
			`${this.BASE_URL}/${id}`
		)
		return response
	}

	async createNote(data: INoteCreateData) {
		const response = await axiosWithAuth.post(this.BASE_URL, data)
		return response
	}

	async updateNote(id: string, data: INoteUpdateData) {
		const response = await axiosWithAuth.patch(`${this.BASE_URL}/${id}`, data)
		return response
	}

	async deleteNote(id: string) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
		return response
	}
}

export const noteService = new NoteService()
