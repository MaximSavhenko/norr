
import { axiosWithAuth } from '@/api/interceptors'
import { ITagResponse, TypeTagFormState } from '@/types/tag.type'

export class TagService {
	private BASE_URL = '/user/tags'
	async getTag() {
		const response = await axiosWithAuth.get<ITagResponse[]>(this.BASE_URL)
		return response
	}

	async createTag(data: TypeTagFormState) {
		const response = await axiosWithAuth.post(this.BASE_URL, data)
		return response
	}

	async updateTag(id: string, data: TypeTagFormState) {
		const response = await axiosWithAuth.patch(`${this.BASE_URL}/${id}`,data)
		return response
	}

	async deleteTag(id: string) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
		return response
	}
}

export const tagService = new TagService()
