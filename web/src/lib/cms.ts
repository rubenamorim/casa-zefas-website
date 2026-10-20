import { createServerFn } from '@tanstack/react-start'
import { notFound } from '@tanstack/react-router'

import type { Config, Media, Unit } from '../../../cms/src/payload-types'

export type Locale = 'pt' | 'en' | 'es'
export const locales: Locale[] = ['pt', 'en', 'es']
export const defaultLocale: Locale = 'pt'
export type Globals = Config['globals']
export type GlobalSlug = keyof Globals
export type { Media, Unit }

// CMS_URL: how this server reaches the CMS (can be a private network URL).
// CMS_PUBLIC_URL: how browsers reach CMS images. Defaults to CMS_URL.
const cmsUrl = () => process.env.CMS_URL || 'http://localhost:3001'
const publicUrl = () => process.env.CMS_PUBLIC_URL || cmsUrl()

// Payload returns relative media URLs; make them absolute for the browser.
function absolutize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(absolutize)
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value)) {
      out[k] = k === 'url' && typeof v === 'string' && v.startsWith('/') ? publicUrl() + v : absolutize(v)
    }
    return out
  }
  return value
}

async function get<T>(path: string): Promise<T> {
  const res = await fetch(cmsUrl() + path)
  if (!res.ok) throw new Error(`CMS ${res.status} on ${path}`)
  return absolutize(await res.json()) as T
}

export const toLocale = (lang: string | undefined): Locale => {
  if (lang === undefined) return defaultLocale
  if (lang === 'en' || lang === 'es') return lang
  throw notFound()
}

export const getGlobal = createServerFn({ method: 'GET' })
  .validator((d: { slug: GlobalSlug; locale: Locale }) => d)
  .handler(({ data }) => get<Globals[typeof data.slug]>(`/api/globals/${data.slug}?locale=${data.locale}&depth=1`))

export const getUnits = createServerFn({ method: 'GET' })
  .validator((locale: Locale) => locale)
  .handler(async ({ data }) => {
    const res = await get<{ docs: Unit[] }>(`/api/units?locale=${data}&sort=order&depth=1&limit=50`)
    return res.docs
  })

// Typed accessor so pages get the right global shape back.
export const loadGlobal = <S extends GlobalSlug>(slug: S, locale: Locale) =>
  getGlobal({ data: { slug, locale } }) as Promise<Globals[S]>

export const media = (m: number | Media | null | undefined): Media | undefined =>
  m && typeof m === 'object' ? m : undefined

export const mediaList = (list: (number | Media)[] | null | undefined) =>
  (list ?? []).map(media).filter((m): m is Media => !!m)
