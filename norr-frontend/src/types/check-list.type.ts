import { IBase } from './root.type'

export interface ICheckListProgressResponse extends IBase {
	content: string
	done: boolean
	topicId: string
}

export type TypeCheckListProgressFormState = Partial<
	Omit<ICheckListProgressResponse, 'id' | 'updatedAt' | 'createdAt' | 'topicId'>
>
