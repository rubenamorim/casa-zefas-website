import { defaultLocale, locales, type Locale, type Media } from './cms'

// Public site origin, used for canonical/hreflang/OG URLs and the sitemap.
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://casazefas.pt').replace(/\/$/, '')

export const pages = {
  home: { route: '/{-$lang}', slug: '' },
  stay: { route: '/{-$lang}/alojamento', slug: 'alojamento' },
  house: { route: '/{-$lang}/a-casa', slug: 'a-casa' },
  geres: { route: '/{-$lang}/geres', slug: 'geres' },
  gallery: { route: '/{-$lang}/galeria', slug: 'galeria' },
  contact: { route: '/{-$lang}/contactos', slug: 'contactos' },
} as const
export type PageKey = keyof typeof pages
export const pageKeys = Object.keys(pages) as PageKey[]

export const langParam = (locale: Locale) => (locale === defaultLocale ? undefined : locale)

export const pathFor = (locale: Locale, page: PageKey) =>
  '/' + [langParam(locale), pages[page].slug].filter(Boolean).join('/')

const ogLocale = { pt: 'pt_PT', en: 'en_GB', es: 'es_ES' } as const

export function seo(args: {
  locale: Locale
  page: PageKey
  title?: string | null
  description?: string | null
  image?: Media
}) {
  const { locale, page } = args
  const title = args.title || 'Villa Zefas'
  const url = SITE_URL + pathFor(locale, page)
  const image = args.image?.sizes?.large?.url || args.image?.url
  return {
    meta: [
      { title },
      { name: 'description', content: args.description ?? '' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Villa Zefas' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: args.description ?? '' },
      { property: 'og:url', content: url },
      { property: 'og:locale', content: ogLocale[locale] },
      ...(image ? [{ property: 'og:image', content: image }] : []),
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'canonical', href: url },
      ...locales.map((l) => ({ rel: 'alternate', hrefLang: l, href: SITE_URL + pathFor(l, page) })),
      { rel: 'alternate', hrefLang: 'x-default', href: SITE_URL + pathFor(defaultLocale, page) },
    ],
  }
}
