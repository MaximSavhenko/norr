import { TypeCheckListProgressFormState } from '@/types/check-list.type'
import { Button } from '../ui/button'

interface ICheckListActionBar {
	newLabel: string
	setNewLabel: (value: string) => void
	createCheckListItem: (content: TypeCheckListProgressFormState) => void
}

export function CheckListActionBar({
	newLabel,
	setNewLabel,
  createCheckListItem
}: ICheckListActionBar) {
	return (
		<div className='mt-2 flex gap-2 w-full'>
			<input
				value={newLabel}
				onChange={e => setNewLabel(e.target.value)}
				className='px-2 py-1 text-sm bg-background border border-input rounded-sm w-1/4'
				placeholder='New check'
				name='check-list'
			/>
			<Button
				onClick={() => {
					if (newLabel.trim()) {
						createCheckListItem({ content: newLabel })
						setNewLabel('')
					}
				}}
				variant='outline'
			>
				Add
			</Button>
		</div>
	)
}
