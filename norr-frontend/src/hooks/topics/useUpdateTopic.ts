import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ITopicResponse, TypeTopicFormState } from '@/types/topic.type'

import { topicService } from '@/services/topics.service'

export function useUpdateTopic(id?: string) {
	const queryClient = useQueryClient()

	const { mutate: updateTopic } = useMutation({
		mutationKey: ['update topic', id],
		mutationFn: ({ id, data }: { id: string; data: ITopicResponse }) =>
			topicService.updateTopic(id, data),
		onSuccess() {
			void queryClient.invalidateQueries({
				queryKey: ['topics']
			})
		}
	})

	return { updateTopic }
}
