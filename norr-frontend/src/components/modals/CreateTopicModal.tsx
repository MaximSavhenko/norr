'use client'

import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { TypeTopicFormState } from '@/types/topic.type'

import { useModalStore } from '@/store/modal.store'

import { useCreateTopic } from '@/hooks/topics/useCreateTopic'

import { BaseModal } from '../base-modal/BaseModal'
import { Button } from '../ui/button'
import {
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '../ui/dialog'
import { Input } from '../ui/input'

export function CreateTopicModal() {
	const { createTopicOpen, closeCreateTopic } = useModalStore()
	const { register, handleSubmit, reset } = useForm<TypeTopicFormState>()
	const { createTopic } = useCreateTopic()

	const onSubmit = (data: TypeTopicFormState) => {
		createTopic(data, {
			onSuccess() {
				;(reset(), closeCreateTopic(), toast.success('Add new topic!'))
			}
		})
	}

	return (
		<BaseModal
			open={createTopicOpen}
			onOpenChange={closeCreateTopic}
			aria-describedby={undefined}
		>
			<DialogHeader>
				<DialogTitle>Create new topic!</DialogTitle>
				<DialogDescription>Add title and description </DialogDescription>
			</DialogHeader>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					className='mb-5'
					type='text'
					placeholder='Topic name:'
					{...register('title', { required: true })}
				/>
				<Input
					className='mb-5'
					type='text'
					placeholder='Topic description:'
					{...register('description')}
				/>
				<DialogFooter>
					<Button type='submit'> Create </Button>
				</DialogFooter>
			</form>
		</BaseModal>
	)
}
