'use client'

import { useState } from 'react'

import {
	Card,
	CardAction,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'

import { INoteResponse } from '@/types/note.type'

import { useNote } from '@/hooks/notes/useNote'
import { useUpdateNote } from '@/hooks/notes/useUpdateNote'

import { AddedTags } from '../tags/AddedTags'
import { TagCreate } from '../tags/TagCreate'
import { TiptapEditor } from '../tiptap-editor/TiptapEditor'
import { Badge } from '../ui/badge'

import { NoteContent } from './NoteContent'
import { NoteMenuBar } from './NoteMenuBar'
import { formatDate } from '@/lib/formatDate'

interface INotePage {
	id: string
}

export function NoteCard({ id }: INotePage) {
	const { notes, isLoading } = useNote(id)
	const [editingNoteId, setEditingNoteId] = useState<string | null>(null)
	const [selectedTags, setSelectedTags] = useState<string[]>([])

	const topicNotes = notes.filter(note => note.topicId === id)

	const handleEdit = (note: INoteResponse) => {
		/* если тут же закрываем — просто null */
		if (editingNoteId === note.id) {
			setEditingNoteId(null)
			setSelectedTags([]) // сбросить выбор
			return
		}
		/* открываем редактор → инициализируем выбранные теги */
		setEditingNoteId(note.id)
		setSelectedTags(note.tags?.map(t => t.id) ?? [])
	}

	const toggleTag = (id: string) =>
		setSelectedTags(prev =>
			prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
		)

	const { updateNote, isPending } = useUpdateNote(id)

	return (
		<div>
			<ul>
				{isLoading && <p>Loading...</p>}
				{!isLoading && topicNotes.length === 0 && <p>No notes found</p>}
				{!isLoading &&
					topicNotes.map(note => {
						const isEditing = note.id === editingNoteId
						return (
							<Card
								key={note.id}
								className='mb-4'
							>
								<CardHeader>
									<CardAction>
										<NoteMenuBar
											onEdit={() => handleEdit(note)}
											id={note.id}
										/>
									</CardAction>
									<CardTitle>
										<p>Creation time - {formatDate(note.createdAt!)}</p>
									</CardTitle>
								</CardHeader>
								<CardContent>
									{isEditing ? (
										<div>
											<TiptapEditor
												content={note.content}
												onCRUDAction={json =>
													updateNote({
														id: note.id,
														data: { content: json, tagIds: selectedTags }
													})
												}
												onCancel={() => setEditingNoteId(null)}
												isLoading={isPending}
												className='mb-4'
											/>
											<AddedTags
												selectedIds={selectedTags}
												setSelectedIds={setSelectedTags}
												className='mb-4'
											/>
											<TagCreate
												onToggle={toggleTag}
												selectedIds={selectedTags}
											/>
										</div>
									) : (
										<NoteContent content={note.content} />
									)}
								</CardContent>
								<CardFooter>
									{note.tags.map(tag => (
										<Badge
											variant='outline'
											key={`${note.id}-${tag.id}`}
											className='mr-2'
										>
											{tag.name}
										</Badge>
									))}
								</CardFooter>
							</Card>
						)
					})}
			</ul>
		</div>
	)
}
