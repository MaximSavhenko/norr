import { useQuery } from '@tanstack/react-query'

import { INoteResponse } from '@/types/note.type'

import { noteService } from '@/services/notes.service'

export function useNote(topicId: string) {
	const { data, isLoading, error } = useQuery<{ data: INoteResponse[] }>({
		queryKey: ['notes', topicId],
		queryFn: () => noteService.getNote()
	})

	return {
		notes: data?.data ?? [],
		isLoading,
		error
	}
}
