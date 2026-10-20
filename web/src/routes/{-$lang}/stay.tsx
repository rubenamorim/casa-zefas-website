import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import { Lightbox } from '#/components/Lightbox'
import { Amenities, Img, PageHero, PageLink, btnSolid, h2, useSite } from '#/components/ui'
import { getUnits, loadGlobal, media, mediaList, type Unit } from '#/lib/cms'
import { seo } from '#/lib/site'

export const Route = createFileRoute('/{-$lang}/stay')({
  loader: async ({ context: { locale } }) => {
    const [page, units] = await Promise.all([loadGlobal('stay', locale), getUnits({ data: locale })])
    return { page, units, locale }
  },
  head: ({ loaderData: d }) =>
    d ? seo({ locale: d.locale, page: 'stay', title: d.page.meta?.title, description: d.page.meta?.description, image: media(d.page.hero?.image) }) : {},
  component: Stay,
})

function Stay() {
  const { page, units, locale } = Route.useLoaderData()
  const site = useSite()
  const { hero, labels, cta } = page
  const [open, setOpen] = useState<Unit | null>(null)

  return (
    <>
      <PageHero image={media(hero?.image)} eyebrow={hero?.eyebrow} title={hero?.title} text={hero?.text} minH="min-h-[64vh]" />

      <section className="bg-cream px-[clamp(20px,6vw,72px)] pt-[clamp(56px,6vw,88px)] pb-[clamp(20px,3vw,40px)]">
        <p className="mx-auto my-0 max-w-[980px] text-center font-serif text-[clamp(22px,2.8vw,32px)] font-medium leading-[1.4] text-forest">{page.intro}</p>
      </section>

      <section className="bg-cream px-[clamp(20px,6vw,72px)] pt-[clamp(40px,5vw,72px)] pb-[clamp(72px,8vw,120px)]">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-[clamp(48px,6vw,96px)]">
          {units.map((u) => {
            const photos = mediaList(u.gallery)
            return (
              <article key={u.id} data-reveal className="flex flex-wrap items-center gap-[clamp(28px,4vw,64px)]">
                <div className="relative min-w-[min(300px,100%)] flex-[1_1_420px]">
                  <Img m={media(u.image)} sizes="(min-width: 980px) 50vw, 100vw" className="block h-[clamp(300px,40vw,460px)] w-full rounded-[2px]" />
                  {u.comingSoon && (
                    <span className="pointer-events-none absolute top-[18px] left-[18px] z-[3] rounded-[40px] bg-[rgba(35,47,43,.92)] px-4 py-2 font-sans text-[10.5px] font-medium uppercase tracking-[.2em] text-linen">
                      {labels?.soonBadge}
                    </span>
                  )}
                  {photos.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setOpen(u)}
                      className="absolute inset-0 z-[2] flex size-full cursor-zoom-in items-end justify-end rounded-[2px] border-none bg-transparent p-[18px] transition-colors duration-300 hover:bg-[rgba(20,28,24,.28)]"
                    >
                      <span className="inline-flex items-center gap-[9px] rounded-[40px] bg-[rgba(246,241,231,.95)] px-[18px] py-[11px] font-sans text-[11px] font-medium uppercase tracking-[.16em] text-forest shadow-[0_6px_20px_-8px_rgba(20,28,24,.5)]">
                        {labels?.viewPhotos} · {photos.length} {labels?.photos}
                      </span>
                    </button>
                  )}
                </div>
                <div className="min-w-[min(300px,100%)] flex-[1_1_380px]">
                  <span className="font-sans text-[11px] font-medium uppercase tracking-[.22em] text-bronze">{u.kicker}</span>
                  <h2 className={`${h2} mt-3 text-[clamp(32px,4.4vw,50px)] leading-[1.04]`}>{u.name}</h2>
                  <p className="mt-5 mb-0 max-w-[46ch] font-sans text-base font-light leading-[1.85] text-body">{u.description}</p>
                  <ul className="my-6 flex list-none flex-wrap gap-2.5 p-0">
                    {u.tags?.map((t) => (
                      <li key={t.id} className="inline-flex items-center gap-[9px] rounded-[40px] bg-sand px-[18px] py-[9px] font-sans text-[13px] text-moss">
                        <span className="inline-block size-[5px] rounded-full bg-[#8a9b8f]" />
                        {t.label}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 flex flex-wrap items-center gap-5 border-t border-[rgba(51,71,63,.14)] pt-6">
                    <span className="font-sans text-[13px] text-forest">{u.capacity}</span>
                    {u.comingSoon ? (
                      <span className="font-sans text-xs font-medium uppercase tracking-[.16em] text-bronze">{labels?.soonNote}</span>
                    ) : (
                      <PageLink locale={locale} page="contact" hash="booking" className={`${btnSolid} ml-auto !px-8 !py-[15px] !text-[12.5px]`}>
                        {labels?.book}
                      </PageLink>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <Amenities eyebrow={page.amenities?.eyebrow} title={page.amenities?.title} items={(site.amenities ?? []).map((a) => a.label)} />

      <section className="bg-sand px-[clamp(20px,6vw,72px)] py-[clamp(72px,8vw,120px)] text-center">
        <div className="mx-auto max-w-[680px]">
          <h2 className={`${h2} text-[clamp(32px,4.6vw,52px)] leading-[1.06]`}>{cta?.title}</h2>
          <p className="mx-auto mt-5 mb-0 max-w-[46ch] font-sans text-base font-light leading-[1.8] text-body">{cta?.text}</p>
          <PageLink locale={locale} page="contact" hash="booking" className={`${btnSolid} mt-[34px]`}>
            {cta?.buttonLabel}
          </PageLink>
        </div>
      </section>

      {open && <Lightbox title={open.name} photos={mediaList(open.gallery)} onClose={() => setOpen(null)} />}
    </>
  )
}
