import type { Metadata } from 'next'

import { NoteCard } from '@/components/notes/NoteCard'
import { NoteCreate } from '@/components/notes/NoteCreate'

export const metadata: Metadata = {
	title: 'Topics'
}

interface ITopicPage {
	params: {
		id: string
	}
}

export default async function TopicPage({ params }: ITopicPage) {
	const { id } = await params

	return (
		<div>
			<NoteCreate topicId={id}/>
			<NoteCard id={id} />
		</div>
	)
}
