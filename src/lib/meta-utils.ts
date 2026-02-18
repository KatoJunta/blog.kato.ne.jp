import { SITE } from '@/consts'

type CanonicalInput = URL | string

interface BaseMetaOptions {
  title?: string
  description?: string
  canonicalUrl: CanonicalInput
  imageUrl: string
  isIndex?: boolean
}

function getSiteUrl(site?: URL): URL {
  return site ?? new URL(SITE.href)
}

export function buildBaseMeta({
  title = SITE.title,
  description = SITE.description,
  canonicalUrl,
  imageUrl,
  isIndex = false,
}: BaseMetaOptions) {
  const normalizedTitle = title.trim() || SITE.title
  const canonical = canonicalUrl.toString()

  return {
    documentTitle: isIndex ? SITE.title : `${normalizedTitle} | ${SITE.title}`,
    title: normalizedTitle,
    description,
    canonicalUrl: canonical,
    ogUrl: canonical,
    imageUrl,
  }
}

export function resolveCanonicalUrl(pathname: string, site?: URL): string {
  return new URL(pathname, getSiteUrl(site)).toString()
}

export function resolveMetaImageUrl({
  site,
  imageSrc,
}: {
  site?: URL
  imageSrc?: string
}): string {
  const siteUrl = getSiteUrl(site)
  if (!imageSrc) {
    return new URL('/static/1200x630.png', siteUrl).toString()
  }
  return new URL(imageSrc, siteUrl).toString()
}
