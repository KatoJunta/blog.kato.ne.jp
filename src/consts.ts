import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: '学びて厭わず',
  description: '雑多な書き物 authored by Junta Kato.',
  href: 'https://blog.kato.ne.jp',
  author: 'Junta Kato',
  locale: 'ja',
  featuredPostCount: 4,
  postsPerPage: 5,
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/posts',
    label: 'posts',
  },
  {
    href: '/tags',
    label: 'tags',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://x.com/KatoJunta',
    label: 'X',
  },
  {
    href: 'https://github.com/KatoJunta',
    label: 'GitHub',
  },
  {
    href: '/rss.xml',
    label: 'RSS',
  },
]

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  X: 'fa6-brands:x-twitter',
  Email: 'lucide:mail',
  RSS: 'lucide:rss',
}

export const AUTHORS = {
  junta: 'Junta Kato',
}
