import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Topics'
}

interface ITopicPage {
	params: {
		id: string
	}
}

export  default async function TopicPage({ params }: ITopicPage) {
	const { id } = await params
	return <div>Topic in {id}</div>
}
