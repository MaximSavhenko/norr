import { topicService } from "@/services/topics.service"
import { ITopicResponse } from "@/types/topic.type"
import { useQuery } from "@tanstack/react-query"


export function useTopics() {

    const {data, isLoading , error} = useQuery<{data: ITopicResponse[]}>({
      queryKey: ['topics'],
      queryFn: () => topicService.getTopics(),
    })

    return {
      items: data?.data ?? [],
      isLoading,
      error
    }
}