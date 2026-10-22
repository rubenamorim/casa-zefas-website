import { Link, getRouteApi } from '@tanstack/react-router'
import type { ComponentProps, ReactNode } from 'react'

import type { Locale, Media } from '#/lib/cms'
import { langParam, pages, type PageKey } from '#/lib/site'

export function Img({ m, className = '', sizes = '100vw', eager }: { m?: Media; className?: string; sizes?: string; eager?: boolean }) {
  if (!m?.url) return <div className={`bg-[#e7ddc9] ${className}`} />
  const s = m.variants
  const srcSet = [s?.thumb, s?.large, s?.xl]
    .filter((v) => v?.url && v.width)
    .map((v) => `${v!.url} ${v!.width}w`)
    .join(', ')
  return (
    <img
      src={s?.large?.url || m.url}
      srcSet={srcSet || undefined}
      sizes={sizes}
      alt={m.alt ?? ''}
      width={m.width ?? undefined}
      height={m.height ?? undefined}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      className={`object-cover ${className}`}
      style={m.focalX != null ? { objectPosition: `${m.focalX}% ${m.focalY}%` } : undefined}
    />
  )
}

export function PageLink({
  locale,
  page,
  hash,
  ...props
}: { locale: Locale; page: PageKey; hash?: string } & Omit<ComponentProps<'a'>, 'href'>) {
  return <Link to={pages[page].route} params={{ lang: langParam(locale) }} hash={hash} {...props} />
}

const tone = {
  muted: { line: 'bg-rule', text: 'text-sage' },
  light: { line: 'bg-[rgba(244,237,224,.6)]', text: 'text-[#f0e7d7] font-normal tracking-[.36em]' },
  bronze: { line: 'bg-bronze', text: 'text-bronze' },
  mist: { line: '', text: 'text-mist' },
}

export function Eyebrow({
  children,
  variant = 'muted',
  center,
  lines = true,
  className = '',
}: {
  children: ReactNode
  variant?: keyof typeof tone
  center?: boolean
  lines?: boolean
  className?: string
}) {
  const t = tone[variant]
  const line = lines && <span className={`h-px w-[34px] ${t.line}`} />
  return (
    <div className={`flex items-center gap-3.5 ${center ? 'justify-center' : ''} ${className}`}>
      {line}
      <span className={`font-sans text-xs font-medium uppercase tracking-[.34em] ${t.text}`}>{children}</span>
      {center && line}
    </div>
  )
}

export function PageHero({
  image,
  eyebrow,
  title,
  text,
  minH = 'min-h-[62vh]',
}: {
  image?: Media
  eyebrow?: string | null
  title?: string | null
  text?: string | null
  minH?: string
}) {
  return (
    <section className={`relative flex items-end overflow-hidden bg-night ${minH}`}>
      <Img m={image} eager className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(20,28,24,.58)_0%,rgba(20,28,24,.32)_42%,rgba(14,20,17,.88)_100%)]" />
      <div className="relative z-[2] mx-auto w-full max-w-[1240px] px-[clamp(20px,7vw,80px)] pb-[clamp(54px,7vw,90px)]">
        <Eyebrow variant="light" className="mb-[22px]">
          {eyebrow}
        </Eyebrow>
        <h1 className="m-0 max-w-[15ch] font-serif text-[clamp(40px,6.5vw,82px)] font-medium leading-[1.02] text-[#fbf7ee] [text-shadow:0_2px_30px_rgba(14,20,17,.6)]">
          {title}
        </h1>
        {text && (
          <p className="mt-[22px] max-w-[52ch] font-sans text-[clamp(15px,1.4vw,18px)] font-light leading-[1.7] text-[rgba(248,243,235,.9)]">
            {text}
          </p>
        )}
      </div>
    </section>
  )
}

export const h2 = 'm-0 font-serif font-medium text-ink'
export const btnSolid =
  'inline-block rounded-[1px] bg-forest px-10 py-[17px] font-sans text-[13px] font-medium uppercase tracking-[.18em] text-linen no-underline transition-colors duration-[250ms] hover:bg-forest-dark'
export const btnLight =
  'inline-block rounded-[1px] bg-linen px-10 py-[18px] font-sans text-[13px] font-medium uppercase tracking-[.18em] text-[#2b352f] no-underline transition-transform duration-[250ms] hover:-translate-y-0.5'
export const textLink =
  'border-b border-forest pb-[5px] font-sans text-[12.5px] font-medium uppercase tracking-[.16em] text-forest no-underline hover:opacity-70'

export function Amenities({ eyebrow, title, items }: { eyebrow?: string | null; title?: string | null; items: string[] }) {
  return (
    <section className="bg-forest px-[clamp(20px,6vw,72px)] py-[clamp(64px,7vw,104px)]">
      <div className="mx-auto max-w-[1180px] text-center">
        <div data-reveal>
          <span className="font-sans text-xs font-medium uppercase tracking-[.34em] text-mist">{eyebrow}</span>
          <h2 className="mt-[18px] mb-0 font-serif text-[clamp(28px,4vw,44px)] font-medium leading-[1.1] text-linen">{title}</h2>
        </div>
        <ul className="m-0 mt-[clamp(40px,5vw,60px)] flex list-none flex-wrap justify-center gap-3.5 p-0">
          {items.map((a) => (
            <li
              key={a}
              className="inline-flex items-center gap-[11px] rounded-[40px] border border-[rgba(244,237,224,.22)] px-6 py-[13px] font-sans text-[14.5px] font-light text-[#e7e0d2]"
            >
              <span className="inline-block size-[5px] rounded-full bg-mist" />
              {a}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** Preserves line breaks from CMS textareas. */
export const Lines = ({ text }: { text?: string | null }) => <span className="whitespace-pre-line">{text}</span>

const layoutApi = getRouteApi('/{-$lang}')
/** Site-wide settings (contacts, amenities, logos) loaded by the language layout. */
export const useSite = () => layoutApi.useLoaderData().site
