import {
  DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '../ui/dropdown-menu'

interface IDropdownMenu {
	label: string
	onEdit?: () => void
	onDelete?: () => void
	editText?: string
	deleteText?: string
}

export function EntityMenu({
	label,
	onEdit,
	onDelete,
	editText = 'Edit',
	deleteText = 'Delete'
}: IDropdownMenu) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='outline-0 cursor-pointer font-bold'>
				...
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>{label}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{onEdit && (
					<DropdownMenuItem onClick={onEdit}>{editText}</DropdownMenuItem>
				)}
				{onDelete && (
					<DropdownMenuItem onClick={onDelete}>{deleteText}</DropdownMenuItem>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
