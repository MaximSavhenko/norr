import { ITopicResponse, TypeTopicFormState } from '@/types/topic.type'

import { axiosWithAuth } from '@/api/interceptors'

class TopicsService {
	private BASE_URL = 'user/topics'

	async getTopicProgress(id: string) {
		const response = await axiosWithAuth.get(`${this.BASE_URL}/progress/${id}`)
		return response.data
	}
	
	async getTopics() {
		const response = await axiosWithAuth.get<ITopicResponse[]>(this.BASE_URL)
		return response
	}

	async createTopic(data: TypeTopicFormState) {
		const response = await axiosWithAuth.post(this.BASE_URL, data)
		return response
	}

	async updateTopic(id: string, data: TypeTopicFormState) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data)
		return response
	}

	async deleteTopic(id: string) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
		return response
	}
}

export const topicService = new TopicsService()
