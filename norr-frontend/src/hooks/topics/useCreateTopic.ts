import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TypeTopicFormState } from '@/types/topic.type'

import { topicService } from '@/services/topics.service'

export function useCreateTopic() {
	const queryClient = useQueryClient()

	const { mutate: createTopic } = useMutation({
		mutationKey: ['create topic'],
		mutationFn: (data: TypeTopicFormState) => topicService.createTopic(data),
		onSuccess() {
			void queryClient.invalidateQueries({
				queryKey: ['topics']
			})
		}
	})

	return { createTopic }
}
