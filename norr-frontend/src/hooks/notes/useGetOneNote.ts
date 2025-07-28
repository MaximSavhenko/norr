import { useQuery } from '@tanstack/react-query'

import { INoteResponse } from '@/types/note.type'

import { NoteService, noteService } from '@/services/notes.service'

export function useGetOneNote(noteId: string) {
	const { data, isLoading, error } = useQuery<{ data: INoteResponse }>({
		queryKey: ['note', noteId],
		queryFn: () => noteService.getOneNote(noteId),
		enabled: !!noteId
	})

	return {
		notesOne: data?.data ?? null,
		isLoading,
		error
	}
}
