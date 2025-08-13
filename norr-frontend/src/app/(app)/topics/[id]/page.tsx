import type { Metadata } from 'next'

import { NoteCard } from '@/components/notes/NoteCard'
import { NoteCreate } from '@/components/notes/NoteCreate'
import { CheckListCard } from '@/components/check-list/CheckListCard'

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
			<CheckListCard className='mb-4' topicId={id}/>
			<NoteCard id={id} />
		</div>
	)
}
