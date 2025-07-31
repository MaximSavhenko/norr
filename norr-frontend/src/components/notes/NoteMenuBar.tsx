import { useDeleteNote } from '@/hooks/notes/useDeleteNote'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { DeleteNoteAlert } from '../alert-dialog/DeleteNoteAlert'
import { useState } from 'react'

interface INoteMenuBar {
	onEdit: () => void
	id: string
}

export function NoteMenuBar({ onEdit, id }: INoteMenuBar) {
	const [isOpen , setOpen] = useState(false)
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger className='outline-0 cursor-pointer font-bold'>
					...
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>Settings Note</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => onEdit()}>Edit Note</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setOpen(true)}>Delete Note</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<DeleteNoteAlert noteId={id} open={isOpen} close={setOpen} />
		</>
	)
}
