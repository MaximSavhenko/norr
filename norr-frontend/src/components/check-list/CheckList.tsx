import { Pencil, Trash } from 'lucide-react'


import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'


interface ICheckList {
	className?: string
	label?: string
	checked?: boolean
	onChange: (v: boolean) => void
	onEdit?: (newContent: string) => void
	onDelete?: () => void
}

export function CheckList({
	className,
	label,
	checked,
	onChange,
	onDelete,
	onEdit
}: ICheckList) {
	return (
		<div className='flex items-center justify-between gap-2'>
			<div className='flex items-center gap-2'>
				<Label>
					<Checkbox
						checked={checked}
						onCheckedChange={onChange}
					/>
					{label}
				</Label>
			</div>

			<div className='flex items-center gap-1'>
				<Button
					variant='ghost'
					size='icon'
					onClick={() => {
						const newLabel = prompt('Введите новое название:', label)
						if (newLabel !== null && newLabel.trim() !== '') {
							onEdit?.(newLabel.trim())
						}
					}}
				>
					<Pencil className='h-4 w-4 text-muted-foreground' />
				</Button>
				<Button
					variant='ghost'
					size='icon'
					onClick={onDelete}
				>
					<Trash className='h-4 w-4 text-destructive' />
				</Button>
			</div>
		</div>
	)
}
