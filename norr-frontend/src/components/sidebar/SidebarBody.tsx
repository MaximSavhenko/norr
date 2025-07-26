import clsx from 'clsx'
import { Loader2 } from 'lucide-react'

import { Progress } from '../ui/progress'

import { SidebarProps } from './SideBar'
import { useTopicProgres } from '@/hooks/topics/useTopicProgres'

interface ISidebarBody
	extends Pick<
		SidebarProps,
		'topics' | 'loading' | 'activeTopicId' | 'onSelect'
	> {
	collapsed: boolean
}

export function SidebarBody({
	topics,
	loading,
	activeTopicId,
	onSelect,
	collapsed
}: ISidebarBody) {
		const {progress , isLoading, error} = useTopicProgres(activeTopicId)
		console.log(progress);
		
	
	return (
		<div className='flex-1 overflow-y-auto px-2 pb-2'>
			{loading ? (
				<div className='flex items-center justify-center py-6 text-foreground/50'>
					<Loader2
						className='animate-spin'
						size={18}
					/>
				</div>
			) : topics.length === 0 ? (
				!collapsed && (
					<p className='px-2 py-4 text-sm text-muted-foreground'>
						No topics yet
					</p>
				)
			) : (
				<ul className='space-y-1'>
					{topics.map(t => {
						const isActive = t.id === activeTopicId
						return (
							<li key={t.id}>
								<button
									onClick={() => onSelect(t.id)}
									className={clsx(
										'group w-full rounded-md px-2 py-2 text-left text-sm transition-colors',
										isActive
											? 'bg-primary/10 text-primary'
											: 'text-foreground/80 hover:bg-accent hover:text-foreground'
									)}
								>
									{/* name */}
									{!collapsed ? (
										<div className='flex flex-col'>
											<span className='truncate'>{t.title}</span>
											{isActive && typeof progress === 'number' && (
												<Progress
													value={progress}
													className='mt-1'
												/>
											)}
										</div>
									) : (
										<span className='block truncate'>{t.title[0]}</span>
									)}
								</button>
							</li>
						)
					})}
				</ul>
			)}
		</div>
	)
}
