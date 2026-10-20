import { Outlet, createFileRoute, useLocation } from '@tanstack/react-router'
import { useEffect } from 'react'

import { Footer } from '#/components/Footer'
import { Header } from '#/components/Header'
import { loadGlobal, toLocale } from '#/lib/cms'

export const Route = createFileRoute('/{-$lang}')({
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
