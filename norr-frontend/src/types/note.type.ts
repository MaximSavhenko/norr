import { JSONContent } from '@tiptap/react'
import { IBase } from './root.type'
import { ITagResponse } from './tag.type'

export interface INoteResponse extends IBase {
	content: JSONContent
	topicId: string
	userId: string
	tags: ITagResponse[]
}

export interface INoteCreateData {
	content: JSONContent
	topicId: string
	tagIds: string[]
}

export interface INoteUpdateData {
	content: JSONContent,
	tagIds: string[]
}
