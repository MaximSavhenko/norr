'use client'

import { Plus, X } from 'lucide-react'
import { useState } from 'react'

import { useCreateNote } from '@/hooks/notes/useCreateNote'

import { AddedTags } from '../tags/AddedTags'
import { TagCreate } from '../tags/TagCreate'
import { TiptapEditor } from '../tiptap-editor/TiptapEditor'
import { Button } from '../ui/button'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger
} from '../ui/drawer'
import { ManageTagsDialog } from '../tags/ManageTagsDialog'

interface INoteCreate {
	topicId: string
}

export function NoteCreate({ topicId }: INoteCreate) {
	const { createNote, isPending } = useCreateNote()

	const [open, setOpen] = useState(false)
	const [selectedTags, setSelectedTags] = useState<string[]>([])
	const [manageOpen , setManageOpen] = useState(false)

	return (
		<Drawer
			direction='bottom'
			open={open}
			onOpenChange={setOpen}
		>
			<DrawerTrigger className='inline-flex items-center justify-center rounded-md border border-border bg-muted px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted/70 focus:outline-none focus:ring-0 focus:ring-offset-0 cursor-pointer mb-4'>
				<Plus
					className='mr-1'
					size={17}
				/>
				note
			</DrawerTrigger>
			<DrawerContent className='w-full'>
				<DrawerHeader>
					<DrawerTitle>Note creation editor</DrawerTitle>
					<DrawerDescription>
						Create a note, it will be linked to the topic, and then you can edit
						and delete it in the topic
					</DrawerDescription>
				</DrawerHeader>
				<TiptapEditor
					onCRUDAction={json =>
						createNote({ topicId, content: json, tagIds: selectedTags })
					}
					onCancel={() => setOpen(false)}
					className='m-4'
				/>
				<DrawerFooter>
					<AddedTags
						selectedIds={selectedTags}
						setSelectedIds={setSelectedTags}
					/>
					<TagCreate
						selectedIds={selectedTags}
						onToggle={id =>
							setSelectedTags(prev =>
								prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
							)
						}
					/>

					<Button
						variant='outline'
						size='sm'
						className='ml-2'
						onClick={() => setManageOpen(true)}
					>
						Manage Tags
					</Button>

					<ManageTagsDialog
						open={manageOpen}
						onOpenChange={setManageOpen}
					/>

					<DrawerClose asChild>
						<Button>Отмена</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}
