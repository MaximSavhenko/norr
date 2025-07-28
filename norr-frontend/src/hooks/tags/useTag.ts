import { tagService } from "@/services/tags.service"
import { useQuery } from "@tanstack/react-query"

export function useTag() {
  
  const {data,isLoading, error} = useQuery({
    queryKey: ['tags'],
    queryFn: () => tagService.getTag()
  })
    return {
      tags: data?.data ?? [],
      isLoading,
      error
    }
}