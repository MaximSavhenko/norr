import { useState } from 'react'

import { Sidebar } from '../sidebar/SideBar'
import { LogoutButton } from '../logout-button/LogoutButton'
import { useTopics } from '@/hooks/topics/useTopic'
import { useTopicProgres } from '@/hooks/topics/useTopicProgres'


export function HomeLayout() {
  const {items: topics , isLoading , error} = useTopics()
	const [activeTopicId, setActiveTopicId] = useState<string | undefined>()

	return (
		<div>
			<LogoutButton />
			<Sidebar
				topics={topics}
				activeTopicId={activeTopicId}
				onSelect={setActiveTopicId}
				onAddTopic={() => console.log('add topic')}
			/>
		</div>
	)
}
