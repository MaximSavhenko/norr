import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TypeTagFormState } from '@/types/tag.type'

import { tagService } from '@/services/tags.service'

export function useCreateTag() {
	const queryClietn = useQueryClient()
  
	const { mutate: createTag } = useMutation({
		mutationKey: ['create tag'],
		mutationFn: (data: TypeTagFormState) => tagService.createTag(data),
		onSuccess() {
			void queryClietn.invalidateQueries({
				queryKey: ['tags']
			})
		}
	})

	return { createTag }
}
