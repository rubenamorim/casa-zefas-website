import { Link, useLocation } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { defaultLocale, locales, media, type Globals, type Locale } from '#/lib/cms'
import { pageKeys, pages, type PageKey } from '#/lib/site'
import { Img, PageLink } from './ui'

const langNames = { pt: 'Português', en: 'English', es: 'Español' }

export function Header({ site, locale }: { site: Globals['site']; locale: Locale }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    setMenuOpen(false)
    setLangOpen(false)
  }, [pathname])
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  // Same page in another language: swap the /en or /es prefix.
  const rest = pathname.replace(/^\/(en|es)(?=\/|$)/, '') || '/'
  const langHref = (l: Locale) => (l === defaultLocale ? rest : `/${l}${rest === '/' ? '' : rest}`)
  const isActive = (page: PageKey) => (rest.split('/')[1] ?? '') === pages[page].slug

  const solid = scrolled
  const fg = solid ? 'text-forest' : 'text-linen'
  const nav = site.nav ?? {}

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] flex items-center justify-between gap-6 px-[clamp(18px,5vw,72px)] transition-[background,padding,box-shadow] duration-[450ms] ${
        scrolled ? 'py-3' : 'py-5'
      } ${
        solid
          ? 'bg-[rgba(246,241,231,.95)] shadow-[0_1px_0_rgba(51,71,63,.10),0_22px_44px_-34px_rgba(35,47,43,.55)] backdrop-blur-md backdrop-saturate-150'
          : 'bg-transparent'
      }`}
    >
      <PageLink locale={locale} page="home" className="flex items-center gap-[13px] no-underline" aria-label={site.brandName ?? 'Villa Zefas'}>
        <span className="relative block h-[42px] w-9 flex-none">
          <Img m={media(site.logoLight)} eager className={`absolute inset-0 size-full !object-contain transition-opacity duration-[450ms] ${solid ? 'opacity-0' : 'opacity-100'}`} />
          <Img m={media(site.logoDark)} eager className={`absolute inset-0 size-full !object-contain transition-opacity duration-[450ms] ${solid ? 'opacity-100' : 'opacity-0'}`} />
        </span>
        <span className="flex flex-col leading-none">
          <span className={`font-serif text-[21px] font-semibold tracking-[.17em] transition-colors duration-[450ms] ${fg}`}>{site.brandName}</span>
          <span className={`mt-[5px] font-sans text-[9px] tracking-[.42em] transition-colors duration-[450ms] ${solid ? 'text-sage' : 'text-[rgba(244,237,224,.85)]'}`}>
            {site.tagline}
          </span>
        </span>
      </PageLink>

      <nav className="hidden items-center gap-[clamp(18px,2vw,32px)] min-[980px]:flex">
        {pageKeys.map((page) => (
          <PageLink
            key={page}
            locale={locale}
            page={page}
            className={`border-b pb-1 font-sans text-[12.5px] uppercase tracking-[.09em] no-underline transition-[color,opacity] hover:opacity-100 ${fg} ${
              isActive(page) ? (solid ? 'border-forest opacity-100' : 'border-linen opacity-100') : 'border-transparent opacity-[.72]'
            }`}
          >
            {nav[page]}
          </PageLink>
        ))}
        <PageLink
          locale={locale}
          page="contact"
          hash="booking"
          className={`ml-1.5 rounded-[1px] border px-[26px] py-3 font-sans text-xs font-medium uppercase tracking-[.17em] no-underline transition-colors duration-[450ms] hover:opacity-90 ${
            solid ? 'border-forest bg-forest text-linen' : 'border-[rgba(244,237,224,.55)] bg-transparent text-white'
          }`}
        >
          {site.bookLabel}
        </PageLink>
        <div className="relative">
          <button
            type="button"
            onClick={() => setLangOpen((o) => !o)}
            aria-expanded={langOpen}
            aria-label="Language"
            className={`inline-flex cursor-pointer items-center gap-[7px] border-none bg-transparent px-0.5 py-1 font-sans text-xs font-medium tracking-[.14em] transition-colors duration-[450ms] ${fg}`}
          >
            {locale.toUpperCase()}
            <span className="translate-y-px text-[9px] opacity-60">▼</span>
          </button>
          {langOpen && (
            <div className="absolute right-0 top-[calc(100%+12px)] z-[120] flex min-w-[132px] flex-col overflow-hidden rounded-[2px] border border-[rgba(51,71,63,.14)] bg-cream shadow-[0_18px_40px_-22px_rgba(35,47,43,.6)]">
              {locales.map((l) => (
                <Link
                  key={l}
                  to={langHref(l)}
                  hrefLang={l}
                  className={`flex items-center justify-between gap-3 px-4 py-3 font-sans text-[12.5px] tracking-[.06em] text-forest no-underline hover:bg-[#ece3d2] ${l === locale ? 'bg-[#ece3d2]' : ''}`}
                >
                  <span>{langNames[l]}</span>
                  <span className="text-[10px] tracking-[.14em] text-bronze">{l.toUpperCase()}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      <button
        type="button"
        onClick={() => setMenuOpen(true)}
        aria-label="Menu"
        className="flex cursor-pointer flex-col gap-1.5 border-none bg-transparent p-2 min-[980px]:hidden"
      >
        {[0, 1, 2].map((i) => (
          <span key={i} className={`block h-[1.6px] w-[26px] transition-colors duration-[450ms] ${solid ? 'bg-forest' : 'bg-linen'}`} />
        ))}
      </button>

      {menuOpen && (
        <div className="fixed inset-0 z-[200] flex flex-col bg-cream px-[clamp(18px,6vw,48px)] py-[26px]">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-3">
              <Img m={media(site.logoDark)} className="h-10 w-[34px] !object-contain" />
              <span className="font-serif text-xl font-semibold tracking-[.17em] text-forest">{site.brandName}</span>
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close"
              className="cursor-pointer border-none bg-transparent px-2.5 py-1.5 font-sans text-[30px] leading-none text-forest"
            >
              ×
            </button>
          </div>
          <nav className="my-auto flex flex-col gap-1.5">
            {pageKeys.map((page) => (
              <PageLink
                key={page}
                locale={locale}
                page={page}
                className="font-serif text-[clamp(34px,9vw,52px)] font-medium leading-[1.18] text-forest no-underline"
              >
                {nav[page]}
              </PageLink>
            ))}
          </nav>
          <div className="flex items-center justify-between border-t border-[rgba(51,71,63,.16)] pt-[22px]">
            <PageLink
              locale={locale}
              page="contact"
              hash="booking"
              className="rounded-[1px] bg-forest px-[30px] py-3.5 font-sans text-[12.5px] font-medium uppercase tracking-[.18em] text-linen no-underline"
            >
              {site.bookLabel}
            </PageLink>
            <span className="flex gap-2">
              {locales.map((l) => (
                <Link
                  key={l}
                  to={langHref(l)}
                  hrefLang={l}
                  className={`rounded-[40px] border px-[13px] py-2 font-sans text-[12.5px] font-medium tracking-[.14em] text-forest no-underline ${
                    l === locale ? 'border-forest bg-[#ece3d2]' : 'border-[rgba(51,71,63,.28)]'
                  }`}
                >
                  {l.toUpperCase()}
                </Link>
              ))}
            </span>
          </div>
        </div>
      )}
    </header>
  )
}
