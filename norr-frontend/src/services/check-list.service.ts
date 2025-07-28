
import { axiosWithAuth } from '@/api/interceptors'
import { ICheckListProgressResponse, TypeCheckListProgressFormState } from '@/types/check-list.type'

export class CheckListProgressService {
	private BASE_URL = '/user/topics/'
	async getCheckListProgress(topicId: string) {
		const response = await axiosWithAuth.get<ICheckListProgressResponse[]>(`${this.BASE_URL}/${topicId}/checklist-item`)
		return response
	}

	async createCheckListProgress(data: TypeCheckListProgressFormState , topicId: string) {
		const response = await axiosWithAuth.post(`${this.BASE_URL}/${topicId}/checklist-item`, data)
		return response
	}

	async updateCheckListProgress(topicId: string, data: TypeCheckListProgressFormState , id: string) {
		const response = await axiosWithAuth.patch(`${this.BASE_URL}/${topicId}/checklist-item/${id}`,data)
		return response
	}

	async deleteCheckListProgress(id: string , topicId: string) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${topicId}/checklist-item/${id}`)
		return response
	}
}

export const checkListProgressService = new CheckListProgressService()
