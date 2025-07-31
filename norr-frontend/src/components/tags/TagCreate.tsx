import { useState } from 'react'

import { useCreateTag } from '@/hooks/tags/useCreateTag'
import { useTag } from '@/hooks/tags/useTag'

import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Command, CommandInput, CommandItem, CommandList } from '../ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'


interface ITagCreate {
  selectedIds: string[]
  onToggle: (id: string) => void
}

export function TagCreate({ selectedIds, onToggle }: ITagCreate) {
	/* local state для выбора */
	const [query, setQuery] = useState('')

	const { tags, isLoading, error } = useTag()
	const { createTag } = useCreateTag()

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					size='sm'
				>
					+ Tag
				</Button>
			</PopoverTrigger>

			<PopoverContent className='w-64 p-0'>
				<Command>
					<CommandInput
						value={query}
						onValueChange={setQuery}
						placeholder='Search tag…'
					/>

					<CommandList>
						{tags.map(tag => {
							const checked = selectedIds.includes(tag.id)

							return (
								<CommandItem
									key={tag.id}
									onSelect={() => onToggle(tag.id)}
								>
									<Checkbox
										checked={checked}
										onCheckedChange={() => onToggle(tag.id)}
										className="mr-2 h-4 w-4"
									/>
									{tag.name}
								</CommandItem>
							)
						})}

						{/* Если ввели новое имя — показать кнопку создания */}
						{query &&
							!tags.some(t => t.name.toLowerCase() === query.toLowerCase()) && (
								<CommandItem
									className='text-primary'
									onSelect={async () => {
										await createTag({ name: query })
										setQuery('')
									}}
								>
									+ Create “{query}”
								</CommandItem>
							)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
