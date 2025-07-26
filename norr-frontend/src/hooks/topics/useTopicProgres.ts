import { useQuery } from '@tanstack/react-query'

import { topicService } from '@/services/topics.service'

export function useTopicProgres(topicId: string | undefined) {
	const { data, isLoading, error } = useQuery({
		queryKey: ['topic-progress', topicId],
		queryFn: () => topicService.getTopicProgress(topicId!),
		enabled: !!topicId
	})
	return { progress: data ?? 0, isLoading, error }
}
