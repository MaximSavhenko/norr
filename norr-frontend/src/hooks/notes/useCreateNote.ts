import { useMutation, useQueryClient } from '@tanstack/react-query'

import { INoteCreateData } from '@/types/note.type'

import { noteService } from '@/services/notes.service'

export function useCreateNote() {
	const queryClietn = useQueryClient()
  
	const { mutate: createNote , isPending , isSuccess } = useMutation({
		mutationKey: ['create note'],
		mutationFn: (data: INoteCreateData) => noteService.createNote(data),
		onSuccess(_, data) {
			void queryClietn.invalidateQueries({
				queryKey: ['notes' , data.topicId]
			})
		}
	})

	return { createNote , isPending , isSuccess}
}
