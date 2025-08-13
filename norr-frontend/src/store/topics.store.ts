import { create } from 'zustand'

import { ITopicResponse } from '@/types/topic.type'

interface ITopicStore {
	topics: ITopicResponse[]
	setTopics: (topics: ITopicResponse[]) => void
	getTopicById: (id: string) => ITopicResponse | undefined
}

export const useTopicStore = create<ITopicStore>((set, get) => ({
	topics: [],
	setTopics: topics => set({ topics }),
	getTopicById: id => get().topics.find(t => t.id === id)
}))