'use client'

import { useEffect } from 'react'

import { useTopicStore } from '@/store/topics.store'

import { useTopics } from '@/hooks/topics/useTopic'

import { HomeLayout } from './HomeLayout'

export function Home() {
	const { items } = useTopics()
	const { setTopics } = useTopicStore()

	useEffect(() => {
		if (!items) return

		const currentTopics = useTopicStore.getState().topics
		const isSame =
			currentTopics.length === items.length &&
			currentTopics.every((t, i) => t.id === items[i].id)

		if (!isSame) {
			setTopics(items)
		}
	}, [items,setTopics])
	return (
		<div>
			<HomeLayout />
		</div>
	)
}
