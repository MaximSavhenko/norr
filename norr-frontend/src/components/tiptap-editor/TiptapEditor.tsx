'use client'

import { EditorContent, JSONContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

interface ITipTapEditor {
	content?: JSONContent
	onCancel?: () => void
	onCRUDAction: (json: JSONContent) => void | Promise<void>
	isLoading?: boolean
	className?: string
}

export function TiptapEditor({
	content,
	onCRUDAction,
	onCancel,
	isLoading,
	className
}: ITipTapEditor) {
	const editor = useEditor({
		extensions: [StarterKit],
		content: content,
		immediatelyRender: false
	})

	const handleSave = async () => {
		if (!editor) return
		await onCRUDAction(editor.getJSON())
		onCancel?.()
		console.log('Tipa sozdu');
		
	}

	if (!editor) return null

	return (
		<div className={cn('space-y-2 border rounded-md p-2 editor-wrapped', className)}>
			<EditorContent
				editor={editor}
				className='prose dark:prose-invert max-w-none transition-all min-h-24'
			/>
			<div className='flex gap-2 justify-between'>
				<div className='flex gap-2'>
					<Button
						variant='outline'
						onClick={() => editor.chain().focus().toggleBold().run()}
						className={editor.isActive('bold') ? 'bg-muted' : ''}
					>
						B
					</Button>
					<Button
						variant='outline'
						onClick={() => editor.chain().focus().toggleItalic().run()}
						className={editor.isActive('italic') ? 'bg-muted' : ''}
					>
						I
					</Button>
					<Button
						variant='outline'
						onClick={() =>
							editor.chain().focus().toggleHeading({ level: 2 }).run()
						}
						className={
							editor.isActive('heading', { level: 2 }) ? 'bg-muted' : ''
						}
					>
						H2
					</Button>
					<Button
						variant='outline'
						onClick={() => editor.chain().focus().toggleBulletList().run()}
						className={editor.isActive('bulletList') ? 'bg-muted' : ''}
					>
						UL
					</Button>
					<Button
						variant='outline'
						onClick={() => editor.chain().focus().toggleCodeBlock().run()}
						className={editor.isActive('codeBlock') ? 'bg-muted' : ''}
					>
						Code
					</Button>
					<Button
						variant='outline'
						onClick={() => editor.chain().focus().toggleOrderedList().run()}
						className={editor.isActive('orderedList') ? 'bg-muted' : ''}
					>
						OL
					</Button>
					<Button
						variant='outline'
						onClick={() => editor.chain().focus().toggleUnderline().run()}
						className={editor.isActive('underline') ? 'bg-muted' : ''}
					>
						U
					</Button>
				</div>

				<Button
					onClick={handleSave}
					disabled={isLoading}
				>
					{isLoading ? 'Saving...' : 'Save'}
				</Button>
			</div>
		</div>
	)
}
