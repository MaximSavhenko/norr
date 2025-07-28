import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TypeCheckListProgressFormState } from '@/types/check-list.type'

import { checkListProgressService } from '@/services/check-list.service'

export function useCreateCheckListProgress(topicId: string) {
	const queryClient = useQueryClient()
	const { mutate: createCheckListItem } = useMutation({
		mutationKey: ['create check-list'],
		mutationFn: (data: TypeCheckListProgressFormState) =>
			checkListProgressService.createCheckListProgress(data, topicId),
		onSuccess() {
			void queryClient.invalidateQueries({
				queryKey: ['check-lists', topicId]
			})
		}
	})
	return { createCheckListItem }
}
