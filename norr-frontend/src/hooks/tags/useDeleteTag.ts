import { useMutation, useQueryClient } from '@tanstack/react-query'

import { tagService } from '@/services/tags.service'

export function useDeleteTag() {
	const queryClietn = useQueryClient()

	const { mutate: deleteTag } = useMutation({
		mutationKey: ['delete tag'],
		mutationFn: (id: string) => tagService.deleteTag(id),
		onSuccess() {
			void queryClietn.invalidateQueries({
				queryKey: ['tags']
			})
		}
	})
	
	return { deleteTag }
}
