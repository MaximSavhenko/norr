'use client'

import clsx from 'clsx'
import { ChevronLeft, Plus } from 'lucide-react'
import { SetStateAction } from 'react'

import { useModalStore } from '@/store/modal.store'

import { SidebarProps } from './SideBar'

interface ISideBarHeader extends Pick<SidebarProps, 'onAddTopic'> {
	collapsed: boolean
	setCollapsed: (value: SetStateAction<boolean>) => void
}

export function SidebarHeader({
	collapsed,
	setCollapsed
}: ISideBarHeader) {
	const { openCreateTopic } = useModalStore()

	return (
		<div className='flex items-center justify-between px-3 py-2'>
			{!collapsed && (
				<span className='text-sm font-semibold text-foreground/70'>Topics</span>
			)}

			<div className='flex items-center gap-1'>
				<button
					onClick={openCreateTopic}
					className={clsx(
						'inline-flex h-7 w-7 items-center justify-center rounded-md text-foreground/70 hover:bg-accent hover:text-foreground',
						collapsed && 'mx-auto'
					)}
					title='Add topic'
				>
					<Plus size={16} />
				</button>

				<button
					title={collapsed ? 'Expand' : 'Collapse'}
					onClick={() => setCollapsed(v => !v)}
					className='inline-flex h-7 w-7 items-center justify-center rounded-md text-foreground/60 hover:bg-accent hover:text-foreground'
				>
					<ChevronLeft
						size={16}
						className={clsx('transition-transform', collapsed && 'rotate-180')}
					/>
				</button>
			</div>
		</div>
	)
}
