import { IBase } from './root.type'

export interface ITagResponse extends IBase {
	name: string
	userId: string
}

export type TypeTagFormState = Partial<
	Omit<ITagResponse,  | 'userId' | 'updatedAt' | 'createdAt'>
>

export interface ITagUpdate {
	name: string
	id: string
}
