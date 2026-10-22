import { createServerFn } from '@tanstack/react-start'
import { notFound } from '@tanstack/react-router'

import type { Config, Media, Unit } from '#/payload/payload-types'

export type Locale = 'pt' | 'en' | 'es'
export const locales: Locale[] = ['pt', 'en', 'es']
export const defaultLocale: Locale = 'pt'
export type Globals = Config['globals']
export type GlobalSlug = keyof Globals
export type { Media, Unit }

// Payload runs in this same server, so content is read via its Local API (no HTTP).
// Imported lazily to keep Payload out of the client bundle.
const payload = async () => {
  const [{ getPayload }, { default: config }] = await Promise.all([import('payload'), import('@payload-config')])
  return getPayload({ config })
}

export const toLocale = (lang: string | undefined): Locale => {
  if (lang === undefined) return defaultLocale
  if (lang === 'en' || lang === 'es') return lang
  throw notFound()
}

export const getGlobal = createServerFn({ method: 'GET' })
  .validator((d: { slug: GlobalSlug; locale: Locale }) => d)
  .handler(async ({ data }) =>
    (await payload()).findGlobal({ slug: data.slug, locale: data.locale, depth: 1, overrideAccess: true }),
  )

export const getUnits = createServerFn({ method: 'GET' })
  .validator((locale: Locale) => locale)
  .handler(async ({ data }) => {
    const res = await (await payload()).find({
      collection: 'units',
      locale: data,
      sort: 'order',
      depth: 1,
      limit: 50,
      overrideAccess: true,
    })
    return res.docs
  })

// Typed accessor so pages get the right global shape back.
export const loadGlobal = <S extends GlobalSlug>(slug: S, locale: Locale) =>
  getGlobal({ data: { slug, locale } }) as Promise<Globals[S]>

export const media = (m: number | Media | null | undefined): Media | undefined =>
  m && typeof m === 'object' ? m : undefined

export const mediaList = (list: (number | Media)[] | null | undefined) =>
  (list ?? []).map(media).filter((m): m is Media => !!m)
