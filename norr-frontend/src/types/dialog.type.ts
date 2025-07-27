export interface IDialog {
	open: boolean
	onOpenChange: (open: boolean) => void
	onClose: () => void
}
