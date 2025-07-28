import { useMutation, useQueryClient } from '@tanstack/react-query'

import { noteService } from '@/services/notes.service'

export function useDeleteNote() {
	const queryClietn = useQueryClient()

	const {
		mutate: deleteNote,
		isPending,
		isSuccess
	} = useMutation({
		mutationKey: ['delete note'],
		mutationFn: (id: string) => noteService.deleteNote(id),
		onSuccess() {
			void queryClietn.invalidateQueries({
				queryKey: ['notes']
			})
		}
	})

	return { deleteNote, isPending, isSuccess }
}
