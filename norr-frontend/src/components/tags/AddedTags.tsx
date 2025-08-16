import { X } from 'lucide-react'

import { Badge } from '../ui/badge'
import { cn } from '@/lib/utils'
import { useTags } from '@/contexts/TagsContext'

export interface TagItem {
	id: string
	name: string
}

interface AddedTagsProps {
	selectedIds: string[] // отмеченные id-шники
	setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>
	className?: string
}

export function AddedTags({
	selectedIds,
	setSelectedIds,
  className
}: AddedTagsProps) {
  const {tags} = useTags()
	return (
		<div className={cn('flex flex-wrap gap-2 mt-2', className)}>
			{selectedIds.map(id => {
				const tag = tags.find(t => t.id === id)
				const label = tag ? tag.name : '...'
        console.log(tag);
        

				return (
					<Badge
						key={id}
						variant='outline'
						className='cursor-pointer'
						onClick={() => setSelectedIds(prev => prev.filter(x => x !== id))}
					>
						{label}
						<X className='ml-1 h-3 w-3' />
					</Badge>
				)
			})}
		</div>
	)
}
