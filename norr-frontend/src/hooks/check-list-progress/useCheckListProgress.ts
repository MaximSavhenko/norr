import { useQuery } from '@tanstack/react-query'

import { checkListProgressService } from '@/services/check-list.service'

export function useCheckListProgress(topicId: string) {
	const { data, isLoading, error } = useQuery({
		queryKey: ['check-lists', topicId],
		queryFn: () => checkListProgressService.getCheckListProgress(topicId)
	})
	return { checkLists: data?.data ?? [], isLoading, error }
}
