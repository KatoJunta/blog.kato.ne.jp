import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { decodeTime } from 'ulid'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
  return Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function readingTime(html: string) {
  const textOnly = html.replace(/<[^>]+>/g, '')
  const wordCount = textOnly.split(/\s+/).length
  const readingTimeMinutes = (wordCount / 200 + 1).toFixed()
  return `約 ${readingTimeMinutes} 分で読めます`
}

export function extractTimeFromUlid(ulid: string): string {
  try {
    const timestamp = decodeTime(ulid)
    const date = new Date(timestamp)

    return (
      Intl.DateTimeFormat('ja-JP', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Tokyo',
      })
        .format(date)
        .replace(':', '時') + '分'
    )
  } catch (error) {
    return ''
  }
}
