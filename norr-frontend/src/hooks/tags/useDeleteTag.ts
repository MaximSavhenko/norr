import { useMutation, useQueryClient } from '@tanstack/react-query'

import { tagService } from '@/services/tags.service'

export function useDeleteTag() {
	const queryClient = useQueryClient()

	const { mutate: deleteTag } = useMutation({
		mutationKey: ['delete tag'],
		mutationFn: (id: string) => tagService.deleteTag(id),
		onSuccess() {
			void queryClient.invalidateQueries({ queryKey: ['tags'] })
			void queryClient.invalidateQueries({ queryKey: ['notes'] }) // ⬅ refresh notes too
		}
	})

	return { deleteTag }
}
