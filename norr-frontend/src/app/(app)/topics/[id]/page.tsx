import type { Metadata } from 'next'

import { CheckListCard } from '@/components/check-list/CheckListCard'
import { NoteCard } from '@/components/notes/NoteCard'
import { NoteCreate } from '@/components/notes/NoteCreate'

export const metadata: Metadata = {
	title: 'Topics'
}

interface ITopicPage {
	params: Promise<{
		id: string
	}>
}

export default async function TopicPage({ params }: ITopicPage) {
	const { id } = await params

	return (
		<div>
			<NoteCreate topicId={id} />
			<CheckListCard
				className='mb-4'
				topicId={id}
			/>
			<NoteCard id={id} />
		</div>
	)
}
