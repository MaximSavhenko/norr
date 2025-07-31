import { useTag } from '@/hooks/tags/useTag'
import { createContext, useContext } from 'react'

export interface TagItem {
  id: string
  name: string
}

interface TagsContextValue {
  tags: TagItem[]
  isLoading: boolean
}

const TagsContext = createContext<TagsContextValue | null>(null)

export function useTags() {
  const ctx = useContext(TagsContext)
  if (!ctx) throw new Error('useTags must be inside <TagsProvider />')
  return ctx
}

export function TagsProvider({ children }: { children: React.ReactNode }) {
  const { tags, isLoading } = useTag()

  return (
    <TagsContext.Provider value={{ tags , isLoading }}>
      {children}
    </TagsContext.Provider>
  )
}