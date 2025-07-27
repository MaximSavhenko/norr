import { useMutation, useQueryClient } from '@tanstack/react-query'

import { topicService } from '@/services/topics.service'

export function useDeleteTopic() {
	const queryClient = useQueryClient()

	const { mutate: deleteTopic, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete topic'],
		mutationFn: (id: string) => topicService.deleteTopic(id),
		onSuccess() {
			void queryClient.invalidateQueries({
				queryKey: ['topics']
			})
		}
	})
	return { deleteTopic, isDeletePending }
}
