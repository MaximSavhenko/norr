'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { ITopicResponse } from '@/types/topic.type'

import { useModalStore } from '@/store/modal.store'

import { useUpdateTopic } from '@/hooks/topics/useUpdateTopic'

import { BaseModal } from '../base-modal/BaseModal'
import { Button } from '../ui/button'
import {
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '../ui/dialog'
import { Input } from '../ui/input'

export function UpdateTopicModal() {
	const { editTopicOpen, closeEditTopic, topicToEdit } = useModalStore()
	const { register, handleSubmit, reset } = useForm<ITopicResponse>()

	useEffect(() => {
  if (editTopicOpen && topicToEdit) {
    reset({
      title: topicToEdit.title || '',
      description: topicToEdit.description || ''
    });
  }
}, [editTopicOpen, topicToEdit, reset]);

	const { updateTopic } = useUpdateTopic()

	const onSubmit = (data: ITopicResponse) => {
		if (!topicToEdit) return
		updateTopic(
			{ id: topicToEdit.id, data },
			{
				onSuccess() {
					reset()
					closeEditTopic()
					toast.success('Topic updated!')
				}
			}
		)
	}

	return (
		<BaseModal
			open={editTopicOpen}
			onOpenChange={closeEditTopic}
			aria-describedby={undefined}
		>
			<DialogHeader>
				<DialogTitle>Update topic</DialogTitle>
				<DialogDescription>Update the fields you need </DialogDescription>
			</DialogHeader>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					className='mb-5'
					type='text'
					placeholder='Topic name:'
					{...register('title')}
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
