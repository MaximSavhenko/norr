'use client'

import clsx from 'clsx'
import { Menu } from 'lucide-react'
import { useState } from 'react'

import { SidebarBody } from './SidebarBody'
import { SidebarHeader } from './SidebarHeader'
import { ITopicResponse } from '@/types/topic.type'


export interface SidebarProps {
	topics: ITopicResponse[]
	activeTopicId?: string
	loading?: boolean
	onSelect: (id: string) => void
	onAddTopic?: () => void
	className?: string
}

export function Sidebar({
	topics,
	activeTopicId,
	loading,
	onSelect,
	onAddTopic,
	className
}: SidebarProps) {
	const [collapsed, setCollapsed] = useState(false)
	const [mobileOpen, setMobileOpen] = useState(false)

	const content = (
		<aside
			className={clsx(
				'flex h-full flex-col border-r border-border bg-background',
				collapsed ? 'w-16' : 'w-64',
				'transition-[width] duration-200',
				className
			)}
		>
			<SidebarHeader
				collapsed={collapsed}
				onAddTopic={onAddTopic}
				setCollapsed={setCollapsed}
			/>

			<SidebarBody
				collapsed={collapsed}
				topics={topics}
				onSelect={onSelect}
				loading={loading}
				activeTopicId={activeTopicId}
			/>
		</aside>
	)

	// Mobile overlay
	return (
		<>
			{/* Desktop */}
			<div className='hidden md:block'>{content}</div>

			{/* Mobile trigger */}
			<button
				onClick={() => setMobileOpen(true)}
				className='fixed left-3 top-3 z-50 rounded-md border bg-background p-2 text-foreground shadow md:hidden'
			>
				<Menu size={18} />
			</button>

			{/* Mobile drawer */}
			{mobileOpen && (
				<div className='fixed inset-0 z-50 flex md:hidden'>
					<div
						className='fixed inset-0 bg-black/50'
						onClick={() => setMobileOpen(false)}
					/>
					<div className='relative z-50'>{content}</div>
				</div>
			)}
		</>
	)
}

/* --- tiny Progress component (shadcn-like, но простой) --- */
function Progress({
	value = 0,
	className
}: {
	value?: number
	className?: string
}) {
	return (
		<div className={clsx('h-1.5 w-full rounded-full bg-muted', className)}>
			<div
				className='h-full rounded-full bg-primary transition-[width]'
				style={{ width: `${value}%` }}
			/>
		</div>
	)
}
