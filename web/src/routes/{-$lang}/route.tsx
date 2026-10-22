import { Outlet, createFileRoute, useLocation } from '@tanstack/react-router'
import { useEffect } from 'react'

import { Footer } from '#/components/Footer'
import { Header } from '#/components/Header'
import { loadGlobal, toLocale } from '#/lib/cms'

import appCss from '../../styles.css?url'

export const Route = createFileRoute('/{-$lang}')({
  head: () => ({
    meta: [{ name: 'theme-color', content: '#33473f' }],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500&display=swap',
      },
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
    ],
  }),
  beforeLoad: ({ params }) => ({ locale: toLocale(params.lang) }),
  loader: async ({ context }) => ({ site: await loadGlobal('site', context.locale) }),
  // Short CDN cache so CMS edits show up within a minute.
  headers: () => ({ 'Cache-Control': 'public, max-age=0, s-maxage=60, stale-while-revalidate=600' }),
  component: Layout,
})

function Layout() {
  const { site } = Route.useLoaderData()
  const { locale } = Route.useRouteContext()
  useReveal()
  return (
    <div className="overflow-x-hidden bg-cream font-sans text-text">
      <Header site={site} locale={locale} />
      <main>
        <Outlet />
      </main>
      <Footer site={site} locale={locale} />
    </div>
  )
}

function useReveal() {
  const { pathname } = useLocation()
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    )
    requestAnimationFrame(() => document.querySelectorAll('[data-reveal]:not(.in)').forEach((el) => io.observe(el)))
    return () => io.disconnect()
  }, [pathname])
}
