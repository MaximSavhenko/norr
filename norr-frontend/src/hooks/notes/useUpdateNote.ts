import { useMutation, useQueryClient } from '@tanstack/react-query'

import { INoteUpdateData } from '@/types/note.type'

import { noteService } from '@/services/notes.service'

export function useUpdateNote(topicID: string) {
	const queryClietn = useQueryClient()

	const {
		mutate: updateNote,
		isPending,
		isSuccess
	} = useMutation({
		mutationKey: ['update note'],
		mutationFn: ({ data, id }: { data: INoteUpdateData; id: string }) =>
			noteService.updateNote(id, data),
		onSuccess() {
			void queryClietn.invalidateQueries({
				queryKey: ['notes', topicID]
			})
		}
	})

	return { updateNote, isPending, isSuccess }
}
