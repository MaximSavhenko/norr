import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TypeTagFormState } from '@/types/tag.type'

import { tagService } from '@/services/tags.service'

export function useUpdateTag() {
	const queryClietn = useQueryClient()
	
	const { mutate: updateTag } = useMutation({
		mutationKey: ['update tag'],
		mutationFn: ({ data, id }: { data: TypeTagFormState; id: string }) =>
			tagService.updateTag(id, data),
		onSuccess() {
			void queryClietn.invalidateQueries({
				queryKey: ['tags']
			})
		}
	})

	return { updateTag }
}
