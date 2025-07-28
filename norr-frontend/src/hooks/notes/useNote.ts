import { noteService, NoteService } from "@/services/notes.service"
import { INoteResponse } from "@/types/note.type"
import { useQuery } from "@tanstack/react-query"

export function useNote() {

    const {data, isLoading, error} = useQuery<{data: INoteResponse[]}>( {
      queryKey: ['notes'],
      queryFn: () => noteService.getNote()  
    }) 

    return {
      notes: data?.data ?? [],
      isLoading,
      error 
    }
}