import { createFileRoute } from '@tanstack/react-router'

import { locales } from '#/lib/cms'
import { SITE_URL, pageKeys, pathFor } from '#/lib/site'

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: () => {
        const urls = pageKeys.flatMap((page) =>
          locales.map((locale) => {
            const alternates = locales
              .map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}${pathFor(l, page)}"/>`)
              .join('')
            return `<url><loc>${SITE_URL}${pathFor(locale, page)}</loc>${alternates}</url>`
          }),
        )
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join('')}</urlset>`
        return new Response(xml, { headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=3600' } })
      },
    },
  },
})
