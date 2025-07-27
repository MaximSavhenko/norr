import { PropsWithChildren } from 'react'

import { Dialog, DialogContent } from '../ui/dialog'

interface IDialog extends PropsWithChildren {
	open: boolean
	onOpenChange: (open: boolean) => void
}

export function BaseModal({ children, open, onOpenChange }: IDialog) {
	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogContent>{children}</DialogContent>
		</Dialog>
	)
}
