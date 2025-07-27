import { create } from 'zustand'

import { ITopicResponse } from '@/types/topic.type'

type ModalState = {
	createTopicOpen: boolean
	openCreateTopic: () => void
	closeCreateTopic: () => void

	editTopicOpen: boolean
	topicToEdit: ITopicResponse | null
	openEditTopic: (topic: ITopicResponse) => void
	closeEditTopic: () => void
}

export const useModalStore = create<ModalState>(set => ({
	createTopicOpen: false,
	openCreateTopic: () => set({ createTopicOpen: true }),
	closeCreateTopic: () => set({ createTopicOpen: false }),

	editTopicOpen: false,
	topicToEdit: null,
	openEditTopic: topic => set({ editTopicOpen: true, topicToEdit: topic }),
	closeEditTopic: () => set({ editTopicOpen: false, topicToEdit: null })
}))
