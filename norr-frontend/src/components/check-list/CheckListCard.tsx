'use client'

import { useState } from 'react'

import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'

import { useTopicStore } from '@/store/topics.store'

import { useCheckListProgress } from '@/hooks/check-list-progress/useCheckListProgress'
import { useCreateCheckListProgress } from '@/hooks/check-list-progress/useCreateCheckListProgress'
import { useDeleteCheckListProgress } from '@/hooks/check-list-progress/useDeleteCheckListProgress'
import { useUpdateCheckListProgress } from '@/hooks/check-list-progress/useUpdateCheckListProgress'
import { useTopicProgres } from '@/hooks/topics/useTopicProgres'

import { Button } from '../ui/button'

import { CheckList } from './CheckList'
import { cn } from '@/lib/utils'

interface ICheckList {
	className?: string
	topicId: string
}

export function CheckListCard({ className, topicId }: ICheckList) {
	const { checkLists } = useCheckListProgress(topicId)
	const { updateCheckListItem } = useUpdateCheckListProgress(topicId)
	const { getTopicById } = useTopicStore()
	const { progress } = useTopicProgres(topicId)
	const { createCheckListItem } = useCreateCheckListProgress(topicId)
	const { deleteCheckListItem } = useDeleteCheckListProgress(topicId)

	const [newLabel, setNewLabel] = useState('')

	const topic = getTopicById(topicId)
	console.log(topic);
	



	return (
		<Card className={cn('', className)}>
			<CardHeader>
				<CardTitle className='flex items-center gap-2'>
					{topic?.title}
					<span className='rounded-sm bg-[#1f1f1f] text-muted-foreground text-xs px-2 py-[1px] border border-[#333] font-mono'>
						{progress}%
					</span>
				</CardTitle>
				<CardDescription>{topic?.description}</CardDescription>
				<CardAction>
					<Button variant='outline'>+ Add check item</Button>
				</CardAction>
				<div className='mt-2 flex gap-2'>
					<input
						value={newLabel}
						onChange={e => setNewLabel(e.target.value)}
						className='px-2 py-1 text-sm bg-background border border-input rounded-sm'
						placeholder='New item'
					/>
					<Button
						onClick={() => {
							if (newLabel.trim()) {
								createCheckListItem({ content: newLabel })
								setNewLabel('')
							}
						}}
						variant='default'
					>
						Add
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				{checkLists.map(label => (
					<CheckList
						key={label.id}
						label={label.content}
						checked={label.done}
						onChange={checked =>
							updateCheckListItem({ data: { done: checked }, id: label.id })
						}
						onDelete={() => deleteCheckListItem(label.id)}
						onEdit={(newContent: string) =>
							updateCheckListItem({
								data: { content: newContent },
								id: label.id
							})
						}
					/>
				))}
			</CardContent>
			<CardFooter></CardFooter>
		</Card>
	)
}
