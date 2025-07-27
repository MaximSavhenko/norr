import { Trash } from 'lucide-react'

import { useDeleteTopic } from '@/hooks/topics/useDeleteTopic'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '../ui/alert-dialog'

export function DeleteTopicAlert({ topicId }: { topicId: string }) {
	const { deleteTopic } = useDeleteTopic()
	const handleDelete = () => {
		deleteTopic(topicId)
	}
	return (
		<AlertDialog>
			<AlertDialogTrigger>
				<Trash size={16} />
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete topic?</AlertDialogTitle>
					<AlertDialogDescription>
						This action will delete the topic forever. It will be impossible to
						cancel.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
