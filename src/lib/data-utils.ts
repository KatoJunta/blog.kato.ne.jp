import { getCollection, type CollectionEntry } from 'astro:content'
import { AUTHORS } from '@/consts'

export async function getAllPosts(): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getCollection('posts')
  return posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
}

export async function getRecentPosts(
  count: number,
): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getAllPosts()
  return posts.slice(0, count)
}

export async function getAdjacentPosts(currentId: string): Promise<{
  prev: CollectionEntry<'posts'> | null
  next: CollectionEntry<'posts'> | null
}> {
  const posts = await getAllPosts()
  const currentIndex = posts.findIndex((post) => post.id === currentId)

  if (currentIndex === -1) {
    return { prev: null, next: null }
  }

  return {
    next: currentIndex > 0 ? posts[currentIndex - 1] : null,
    prev: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
  }
}

export async function getAllProjects(): Promise<CollectionEntry<'projects'>[]> {
  const projects = await getCollection('projects')
  return projects.sort((a, b) => {
    const dateA = a.data.startDate?.getTime() || 0
    const dateB = b.data.startDate?.getTime() || 0
    return dateB - dateA
  })
}

export async function getAllTags(): Promise<Map<string, number>> {
  const posts = await getAllPosts()

  return posts.reduce((acc, post) => {
    post.data.tags?.forEach((tag) => {
      acc.set(tag, (acc.get(tag) || 0) + 1)
    })
    return acc
  }, new Map<string, number>())
}

export async function getSortedTags(): Promise<
  { tag: string; count: number }[]
> {
  const tagCounts = await getAllTags()

  return [...tagCounts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => {
      const countDiff = b.count - a.count
      return countDiff !== 0 ? countDiff : a.tag.localeCompare(b.tag)
    })
}

export function groupPostsByYear(
  posts: CollectionEntry<'posts'>[],
): Record<string, CollectionEntry<'posts'>[]> {
  return posts.reduce(
    (acc: Record<string, CollectionEntry<'posts'>[]>, post) => {
      const year = post.data.date.getFullYear().toString()
      ;(acc[year] ??= []).push(post)
      return acc
    },
    {},
  )
}

export async function parseAuthors(authorIds: string[] = []) {
  if (!authorIds.length) return []

  return authorIds.map((id) => {
    return {
      id,
      name: AUTHORS[id as keyof typeof AUTHORS] || id,
    }
  })
}

export async function getPostsByAuthor(
  authorId: string,
): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getAllPosts()
  return posts.filter((post) => post.data.authors?.includes(authorId))
}

export async function getPostsByTag(
  tag: string,
): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getAllPosts()
  return posts.filter((post) => post.data.tags?.includes(tag))
}
