import clsx from 'clsx'
import { Edit, Loader2, Trash } from 'lucide-react'
import Link from 'next/link'

import { useModalStore } from '@/store/modal.store'

import { useTopicProgres } from '@/hooks/topics/useTopicProgres'

import { DeleteTopicAlert } from '../alert-dialog/DeleteTopicAlert'
import { Progress } from '../ui/progress'

import { SidebarProps } from './SideBar'

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
	const { progress, isLoading, error } = useTopicProgres(activeTopicId)
	const { openEditTopic } = useModalStore()

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
							<li
								key={t.id}
								className='mb-5'
							>
								<div
									role='button'
									tabIndex={0}
									onClick={() => onSelect(t.id)}
									className={clsx(
										'group w-full rounded-md px-2 py-2 text-left text-sm transition-colors h-[72px]',
										isActive
											? 'bg-primary/10 text-primary'
											: 'text-foreground/80 hover:bg-accent hover:text-foreground'
									)}
								>
									{/* name */}
									{!collapsed ? (
										<div className='flex flex-col justify-between h-full'>
											<Link href={`/topics/${t.id}`}>
												<p className='truncate'>{t.title}</p>
												{isActive && typeof progress === 'number' && (
													<Progress
														value={progress}
														className='mt-1'
													/>
												)}
											</Link>
											<div className='flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
												<button
													onClick={() => openEditTopic(t)}
													className='p-1 hover:text-primary'
												>
													<Edit size={16} />
												</button>
												<DeleteTopicAlert topicId={t.id} />
											</div>
										</div>
									) : (
										<span>
											<Link
												className='flex items-center justify-center h-full w-full  truncate'
												href={`/topics/${t.id}`}
											>
												{t.title[0]}
											</Link>
										</span>
									)}
								</div>
							</li>
						)
					})}
				</ul>
			)}
		</div>
	)
}
