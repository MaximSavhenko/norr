import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TypeCheckListProgressFormState } from '@/types/check-list.type'

import { checkListProgressService } from '@/services/check-list.service'

export function useUpdateCheckListProgress(topicId: string) {
	const queryClient = useQueryClient()
	const { mutate: updateCheckListItem } = useMutation({
		mutationKey: ['update check-list'],
		mutationFn: ({data,id}:{data: TypeCheckListProgressFormState , id: string}) =>
			checkListProgressService.updateCheckListProgress(topicId, data, id),
		onSuccess() {
			void queryClient.invalidateQueries({
				queryKey: ['check-lists', topicId],
			}),
			void queryClient.invalidateQueries({
				queryKey: ['topic-progress', topicId]
			})
		}
	})
	return { updateCheckListItem }
}
