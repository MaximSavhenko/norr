import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ITopicResponse } from '@/types/topic.type'

import { topicService } from '@/services/topics.service'
import { useTopicStore } from '@/store/topics.store'

export function useUpdateTopic(id?: string) {
	const queryClient = useQueryClient()

	const { mutate: updateTopic } = useMutation<
		ITopicResponse, // ✅ что возвращает мутация
		Error,          // ❌ или твой тип ошибки
		{ id: string; data: ITopicResponse } // что принимает мутация
	>({
		mutationKey: ['update topic', id],
		mutationFn: async ({ id, data }) => {
			const res = await topicService.updateTopic(id, data)
			return res.data // ✅ теперь на выходе чистый ITopicResponse
		},
		onSuccess(updatedTopic) {
			// Можешь сразу обновить store, а не просто инвалидировать
			// пример:
			useTopicStore.setState(state => ({
			  topics: state.topics.map(t => t.id === updatedTopic.id ? updatedTopic : t)
			}))
			void queryClient.invalidateQueries({
				queryKey: ['topics']
			})
		}
	})

	return { updateTopic }
}