import { Trash } from 'lucide-react'
import { toast } from 'sonner'

import { ITagUpdate } from '@/types/tag.type'

import { useDeleteTag } from '@/hooks/tags/useDeleteTag'
import { useUpdateTag } from '@/hooks/tags/useUpdateTag'

import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Input } from '../ui/input'

import { useTags } from '@/contexts/TagsContext'
import { useForm } from 'react-hook-form'

function TagRow({
  tag,
  onRename,
  onDelete
}: {
  tag: { id: string; name: string }
  onRename: (id: string, name: string) => void
  onDelete: (id: string) => void
}) {
  const { register, handleSubmit } = useForm<{ name: string }>({
    defaultValues: { name: tag.name }
  })

  const submit = handleSubmit(data => onRename(tag.id, data.name))

  return (
    <form onSubmit={submit} className="flex items-center gap-2">
      <Input {...register('name', { required: true })} />
      <Button
        size="icon"
        variant="ghost"
        type="button"
        onClick={() => onDelete(tag.id)}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </form>
  )
}

interface IManageTags {
	open: boolean
	onOpenChange: (v: boolean) => void
}

export function ManageTagsDialog({ open, onOpenChange }: IManageTags) {
	const { tags } = useTags()
	const { updateTag } = useUpdateTag()
	const { deleteTag } = useDeleteTag()

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Tags</DialogTitle>
				</DialogHeader>

        <div className="space-y-3 max-h-72">
          {tags.map(tag => (
            <TagRow
              key={tag.id}
              tag={tag}
              onRename={(id, name) =>
                updateTag(
                  { id, data: { name } },
                  { onSuccess: () => toast.success('Tag renamed!') }
                )
              }
              onDelete={deleteTag}
            />
          ))}
        </div>
			</DialogContent>
		</Dialog>
	)
}
