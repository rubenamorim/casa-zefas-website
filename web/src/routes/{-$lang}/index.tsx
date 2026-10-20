import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import { Lightbox } from '#/components/Lightbox'
import { Amenities, Eyebrow, Img, Lines, PageLink, btnLight, h2, textLink, useSite } from '#/components/ui'
import { getUnits, loadGlobal, media, mediaList, type Globals } from '#/lib/cms'
import { SITE_URL, pathFor, seo } from '#/lib/site'

export const Route = createFileRoute('/{-$lang}/')({
  loader: async ({ context: { locale } }) => {
    const [page, units] = await Promise.all([loadGlobal('home', locale), getUnits({ data: locale })])
    return { page, units, locale }
  },
  head: ({ loaderData, matches }) => {
    if (!loaderData) return {}
    const { page, locale } = loaderData
    const layout = (matches as { routeId: string; loaderData?: unknown }[]).find((m) => m.routeId === '/{-$lang}')
    const site = (layout?.loaderData as { site?: Globals['site'] } | undefined)?.site
    const image = media(page.hero?.image)
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'LodgingBusiness',
      name: 'Villa Zefas',
      description: page.meta?.description,
      url: SITE_URL + pathFor(locale, 'home'),
      image: image?.url,
      telephone: site?.phone,
      email: site?.email,
      address: { '@type': 'PostalAddress', streetAddress: site?.address, addressCountry: 'PT' },
      sameAs: [site?.instagramUrl, site?.facebookUrl].filter(Boolean),
    }
    return {
      ...seo({ locale, page: 'home', title: page.meta?.title, description: page.meta?.description, image }),
      scripts: [{ type: 'application/ld+json', children: JSON.stringify(jsonLd) }],
    }
  },
  component: Home,
})

function Home() {
  const { page, units, locale } = Route.useLoaderData()
  const site = useSite()
  const { hero, intro, news, geres, gallery, reviews, cta } = page
  const galleryPhotos = mediaList(gallery?.images)
  const [lb, setLb] = useState<number | null>(null)

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-screen flex-col overflow-hidden">
        <div className="absolute inset-0 animate-[kenburns_18s_ease-out_forwards] bg-night animate-kenburns">
          <Img m={media(hero?.image)} eager className="absolute inset-0 size-full" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_46%,rgba(18,24,21,.5)_0%,rgba(18,24,21,0)_60%),linear-gradient(180deg,rgba(20,28,24,.6)_0%,rgba(20,28,24,.4)_38%,rgba(20,28,24,.5)_62%,rgba(16,22,19,.84)_100%)]" />

        <div className="relative z-[2] flex flex-1 flex-col items-center justify-center px-[clamp(20px,7vw,80px)] pt-[120px] text-center">
          <div className="mb-[30px] flex items-center gap-4">
            <span className="h-px w-[38px] bg-[rgba(244,237,224,.6)]" />
            <span className="font-sans text-[12.5px] uppercase tracking-[.4em] text-[#f0e7d7]">{hero?.eyebrow}</span>
            <span className="h-px w-[38px] bg-[rgba(244,237,224,.6)]" />
          </div>
          <h1 className="m-0 max-w-[16ch] font-serif text-[clamp(44px,8vw,104px)] font-medium leading-[1.02] tracking-[.005em] text-[#fbf7ee] [text-shadow:0_2px_40px_rgba(20,28,24,.35)]">
            {hero?.title}
          </h1>
          <p className="mt-[30px] mb-0 max-w-[54ch] font-sans text-[clamp(16px,1.5vw,20px)] font-light leading-[1.7] text-[rgba(248,243,235,.92)]">
            {hero?.text}
          </p>
          <div className="mt-[42px] flex flex-wrap justify-center gap-4">
            <PageLink locale={locale} page="stay" className={`${btnLight} hover:bg-white`}>
              {hero?.primaryCta}
            </PageLink>
            <PageLink
              locale={locale}
              page="contact"
              hash="reservas"
              className="rounded-[1px] border border-[rgba(244,237,224,.6)] bg-transparent px-[38px] py-[18px] font-sans text-[13px] font-medium uppercase tracking-[.18em] text-linen no-underline transition-colors hover:bg-[rgba(244,237,224,.12)]"
            >
              {hero?.secondaryCta}
            </PageLink>
          </div>
        </div>

        <div className="relative z-[2] px-[clamp(16px,5vw,56px)] pb-[clamp(28px,4vh,46px)]">
          <PageLink
            locale={locale}
            page="contact"
            hash="reservas"
            className="mx-auto mt-10 flex max-w-[680px] flex-wrap items-stretch overflow-hidden rounded-[2px] bg-[rgba(246,241,231,.96)] no-underline shadow-[0_24px_60px_-28px_rgba(20,28,24,.6)] backdrop-blur-[6px]"
          >
            {[hero?.arrivalLabel, hero?.departureLabel].map((label, i) => (
              <span key={i} className="flex flex-[1_1_130px] flex-col gap-[5px] border-r border-[rgba(51,71,63,.12)] px-6 py-[18px]">
                <span className="font-sans text-[10px] font-medium uppercase tracking-[.22em] text-sage">{label}</span>
                <span className="font-serif text-[21px] text-forest">{hero?.selectDateLabel}</span>
              </span>
            ))}
            <span className="flex flex-none items-center bg-forest px-[30px] py-[18px] font-sans text-[12.5px] font-medium uppercase tracking-[.16em] text-linen">
              {hero?.availabilityLabel}
            </span>
          </PageLink>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-cream px-[clamp(20px,7vw,80px)] py-[clamp(80px,9vw,140px)]">
        <div data-reveal className="mx-auto max-w-[880px] text-center">
          <Eyebrow center className="mb-[30px]">
            {intro?.eyebrow}
          </Eyebrow>
          <p className="m-0 font-serif text-[clamp(26px,3.6vw,42px)] font-medium leading-[1.34] tracking-[.004em] text-ink">{intro?.text}</p>
          <p className="mt-[34px] mb-0 font-serif text-[21px] italic text-bronze">{intro?.signature}</p>
        </div>
      </section>

      {/* UNITS */}
      <section className="bg-sand px-[clamp(20px,6vw,72px)] py-[clamp(80px,9vw,140px)]">
        <div className="mx-auto max-w-[1240px]">
          <div data-reveal className="mb-[clamp(44px,5vw,68px)] flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow className="mb-5">{page.units?.eyebrow}</Eyebrow>
              <h2 className={`${h2} max-w-[14ch] text-[clamp(34px,5vw,58px)] leading-[1.04]`}>{page.units?.title}</h2>
            </div>
            <PageLink locale={locale} page="stay" className={`${textLink} whitespace-nowrap`}>
              {page.units?.linkLabel}
            </PageLink>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] gap-[clamp(20px,2.4vw,34px)]">
            {units.map((u) => (
              <article key={u.id} data-reveal className="overflow-hidden rounded-[2px] bg-paper shadow-[0_1px_3px_rgba(44,58,53,.06)]">
                <div className="relative">
                  <Img m={media(u.image)} sizes="(min-width: 980px) 33vw, 100vw" className="block h-[280px] w-full" />
                  {u.comingSoon && (
                    <span className="absolute top-4 left-4 rounded-[40px] bg-[rgba(35,47,43,.92)] px-3.5 py-[7px] font-sans text-[10px] font-medium uppercase tracking-[.2em] text-linen">
                      {page.units?.soonBadge}
                    </span>
                  )}
                </div>
                <div className="px-[30px] pt-[30px] pb-[34px]">
                  <span className="font-sans text-[11px] font-medium uppercase tracking-[.2em] text-bronze">{u.cardLabel}</span>
                  <h3 className="mt-3 mb-0 font-serif text-[30px] font-medium leading-[1.1] text-ink">{u.name}</h3>
                  <p className="mt-3.5 mb-0 font-sans text-[15px] font-light leading-[1.75] text-body">{u.summary}</p>
                  <div className="mt-[22px] border-t border-[rgba(51,71,63,.12)] pt-[18px] font-sans text-[13px] text-forest">{u.cardCapacity}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Amenities eyebrow={page.amenities?.eyebrow} title={page.amenities?.title} items={(site?.amenities ?? []).map((a) => a.label)} />

      {/* NEWS */}
      <section className="border-y border-[rgba(138,107,62,.2)] bg-sand px-[clamp(20px,6vw,72px)] py-[clamp(72px,8vw,120px)]">
        <div className="mx-auto max-w-[1240px]">
          <div data-reveal className="mx-auto mb-[clamp(44px,5vw,64px)] max-w-[760px] text-center">
            <Eyebrow variant="bronze" center className="mb-5">
              {news?.eyebrow}
            </Eyebrow>
            <h2 className={`${h2} text-[clamp(32px,4.6vw,54px)] leading-[1.05]`}>{news?.title}</h2>
            <p className="mt-[22px] mb-0 font-sans text-base font-light leading-[1.85] text-body">{news?.text}</p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[clamp(20px,2.4vw,32px)]">
            {news?.items?.map((n) => (
              <div key={n.id} data-reveal className="relative rounded-[2px] border border-[rgba(138,107,62,.28)] bg-paper px-8 pt-9 pb-[34px]">
                <span className="absolute -top-[11px] left-8 rounded-[40px] bg-bronze px-[13px] py-1.5 font-sans text-[9.5px] font-medium uppercase tracking-[.22em] text-[#f8f3ea]">
                  {news.badge}
                </span>
                <h3 className="mt-2 mb-0 font-serif text-[30px] font-medium leading-[1.12] text-ink">{n.title}</h3>
                <p className="mt-3.5 mb-0 font-sans text-[15px] font-light leading-[1.8] text-body">{n.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GERÊS TEASER */}
      <section className="bg-cream px-[clamp(20px,6vw,72px)] py-[clamp(80px,9vw,140px)]">
        <div data-reveal className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-[clamp(36px,5vw,80px)]">
          <div className="min-w-[min(300px,100%)] flex-[1_1_360px]">
            <Eyebrow className="mb-[22px]">{geres?.eyebrow}</Eyebrow>
            <h2 className={`${h2} max-w-[13ch] text-[clamp(32px,4.6vw,54px)] leading-[1.05]`}>{geres?.title}</h2>
            <p className="mt-[26px] mb-0 max-w-[46ch] font-sans text-base font-light leading-[1.85] text-body">{geres?.text}</p>
            <div className="my-[34px] flex flex-wrap gap-7">
              {geres?.stats?.map((s) => (
                <span key={s.id} className="flex flex-col">
                  <span className="font-serif text-[38px] leading-none text-forest">{s.value}</span>
                  <span className="mt-1.5 font-sans text-xs uppercase tracking-[.12em] text-sage">{s.label}</span>
                </span>
              ))}
            </div>
            <PageLink locale={locale} page="geres" className={textLink}>
              {geres?.linkLabel}
            </PageLink>
          </div>
          <div className="flex min-w-[min(300px,100%)] flex-[1_1_360px] gap-4">
            <Img m={media(geres?.image1)} sizes="25vw" className="h-[clamp(320px,42vw,480px)] min-w-0 flex-1 rounded-[2px]" />
            <Img m={media(geres?.image2)} sizes="25vw" className="mt-10 h-[clamp(320px,42vw,480px)] min-w-0 flex-1 rounded-[2px]" />
          </div>
        </div>
      </section>

      {/* GALLERY TEASER */}
      <section className="bg-sand px-[clamp(20px,6vw,72px)] py-[clamp(80px,9vw,130px)]">
        <div className="mx-auto max-w-[1240px]">
          <div data-reveal className="mb-[clamp(40px,5vw,60px)] text-center">
            <span className="font-sans text-xs font-medium uppercase tracking-[.34em] text-sage">{gallery?.eyebrow}</span>
            <h2 className={`${h2} mt-4 text-[clamp(30px,4.4vw,50px)] leading-[1.06]`}>{gallery?.title}</h2>
          </div>
          <div data-reveal className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3.5">
            {galleryPhotos.map((m, i) => (
              <button key={m.id} type="button" onClick={() => setLb(i)} className="min-w-0 cursor-zoom-in overflow-hidden rounded-[2px] border-none bg-transparent p-0">
                <Img m={m} sizes="(min-width: 980px) 25vw, 50vw" className="aspect-[4/3] w-full transition-transform duration-500 hover:scale-[1.03]" />
              </button>
            ))}
          </div>
          <div className="mt-[38px] text-center">
            <PageLink locale={locale} page="gallery" className={textLink}>
              {gallery?.linkLabel}
            </PageLink>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-cream px-[clamp(20px,6vw,72px)] py-[clamp(80px,9vw,140px)]">
        <div className="mx-auto max-w-[1180px]">
          <div data-reveal className="mb-[clamp(44px,5vw,64px)] text-center">
            <span className="font-sans text-xs font-medium uppercase tracking-[.34em] text-sage">{reviews?.eyebrow}</span>
            <h2 className={`${h2} mt-4 text-[clamp(30px,4.4vw,50px)] leading-[1.06]`}>{reviews?.title}</h2>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[clamp(20px,2.4vw,32px)]">
            {reviews?.items?.map((r) => (
              <figure key={r.id} data-reveal className="m-0 flex flex-col rounded-[2px] border border-[rgba(51,71,63,.10)] bg-card px-[34px] py-9">
                <span aria-hidden className="font-sans text-sm tracking-[.32em] text-gold">
                  ★★★★★
                </span>
                <blockquote className="mx-0 mt-5 mb-0 font-serif text-2xl leading-[1.42] italic text-forest">{r.quote}</blockquote>
                <figcaption className="mt-auto pt-[26px] font-sans text-[13px] font-medium tracking-[.1em] text-body">
                  {r.name}
                  <span className="font-light text-[#9aa89f]"> · {r.where}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-deep px-[clamp(20px,6vw,72px)] py-[clamp(84px,10vw,150px)] text-center">
        <Img m={media(site?.logoLight)} className="pointer-events-none absolute top-1/2 -right-10 h-[120%] w-auto -translate-y-1/2 !object-contain opacity-[.05]" />
        <div data-reveal className="relative mx-auto max-w-[760px]">
          <span className="font-sans text-xs font-medium uppercase tracking-[.34em] text-mist">{cta?.eyebrow}</span>
          <h2 className="mt-5 mb-0 font-serif text-[clamp(36px,5.5vw,64px)] font-medium leading-[1.04] text-linen">{cta?.title}</h2>
          <p className="mx-auto mt-6 mb-0 max-w-[48ch] font-sans text-[17px] font-light leading-[1.8] text-[rgba(231,224,210,.78)]">
            <Lines text={cta?.text} />
          </p>
          <div className="mt-[42px] flex flex-wrap justify-center gap-4">
            <PageLink locale={locale} page="contact" hash="reservas" className={btnLight}>
              {cta?.buttonLabel}
            </PageLink>
            {site?.instagramUrl && (
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener"
                className="rounded-[1px] border border-[rgba(244,237,224,.5)] bg-transparent px-10 py-[18px] font-sans text-[13px] font-medium uppercase tracking-[.18em] text-linen no-underline transition-colors hover:bg-[rgba(244,237,224,.1)]"
              >
                {site.instagramHandle}
              </a>
            )}
          </div>
        </div>
      </section>

      {lb !== null && <Lightbox title={gallery?.title} photos={galleryPhotos} start={lb} onClose={() => setLb(null)} />}
    </>
  )
}
