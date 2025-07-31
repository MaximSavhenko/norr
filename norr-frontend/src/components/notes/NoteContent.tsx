import { EditorContent, JSONContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'

interface INoteContent {
	content: JSONContent
}

export function NoteContent({ content }: INoteContent) {
	const editor = useEditor({
		extensions: [StarterKit],
		editable: false,
		immediatelyRender: false,
		content: content,
	})

	useEffect(() => {
		if (editor && content) {
			try {
				editor.commands.setContent(content)
			} catch (error) {
				console.error('Invalid content JSON', error)
			}
		}
	}, [content, editor])

	if (!editor) {
		return null
	}
	return <EditorContent editor={editor} />
}
