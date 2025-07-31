import { Trash } from 'lucide-react'

import { useDeleteNote } from '@/hooks/notes/useDeleteNote'
import { useDeleteTopic } from '@/hooks/topics/useDeleteTopic'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '../ui/alert-dialog'

interface IDeleteNoteAlert {
	noteId: string
	open: boolean
	close: (v: boolean) => void
}

export function DeleteNoteAlert({ noteId, open, close }: IDeleteNoteAlert) {
	const { deleteNote } = useDeleteNote()
	const handleDelete = () => {
		deleteNote(noteId)
		close(false)
	}
	return (
		<AlertDialog
			open={open}
			onOpenChange={close}
		>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete note?</AlertDialogTitle>
					<AlertDialogDescription>
						This action will delete the note forever. It will be impossible to
						cancel.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={() => close(false)}>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
