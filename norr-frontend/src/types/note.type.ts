import { IBase } from './root.type'

export interface INoteResponse extends IBase {
	content: string
	topicId: string
	userId: string
	tags: string[]
}

export interface INoteCreateData {
	content: string
	topicId: string
	tagIds: string[]
}

export interface INoteUpdateData {
	content: string
}
