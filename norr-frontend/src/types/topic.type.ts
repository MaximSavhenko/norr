import { IBase } from './root.type'

export interface ITopicResponse extends IBase {
	title: string
	description?: string
}

export type TypeTopicFormState = Partial<
	Omit<ITopicResponse, 'id' | 'updateAt'>
>
