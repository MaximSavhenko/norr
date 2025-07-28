import { useMutation, useQueryClient } from '@tanstack/react-query'

import { checkListProgressService } from '@/services/check-list.service'

export function useDeleteCheckListProgress(topicId: string) {
	const queryClient = useQueryClient()
	const { mutate: deleteCheckListItem } = useMutation({
		mutationKey: ['delete check-list'],
		mutationFn: (id: string) =>
			checkListProgressService.deleteCheckListProgress(id, topicId),
		onSuccess() {
			void queryClient.invalidateQueries({
				queryKey: ['check-lists', topicId]
			})
		}
	})
	return { deleteCheckListItem }
}
