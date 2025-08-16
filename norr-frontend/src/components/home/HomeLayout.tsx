import { useState } from 'react'

import { useTopics } from '@/hooks/topics/useTopic'

import { Sidebar } from '../sidebar/SideBar'

export function HomeLayout() {
	const { items: topics } = useTopics()
	const [activeTopicId, setActiveTopicId] = useState<string | undefined>()

	return (
		<Sidebar
			topics={topics}
			activeTopicId={activeTopicId}
			onSelect={setActiveTopicId}
			onAddTopic={() => console.log('add topic')}
		/>
	)
}
