import { useDeleteTopic } from '@/hooks/topics/useDeleteTopic'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from '../ui/alert-dialog'
import { useRouter } from 'next/navigation'

interface IDeleteTopicAlert {
	topicId: string
	isOpen: boolean
	setOpen: (open: boolean) => void
}

export function DeleteTopicAlert({
	topicId,
	isOpen,
	setOpen
}: IDeleteTopicAlert) {
	const {push} = useRouter()
	const { deleteTopic } = useDeleteTopic()
	const handleDelete = () => {
		deleteTopic(topicId)
		push('/')
	}
	return (
		<AlertDialog open={isOpen} onOpenChange={setOpen}>
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
