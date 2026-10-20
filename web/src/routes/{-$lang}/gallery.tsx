import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import { Lightbox } from '#/components/Lightbox'
import { Img, PageHero, PageLink, btnLight } from '#/components/ui'
import { loadGlobal, media, mediaList, type Media } from '#/lib/cms'
import { seo } from '#/lib/site'

export const Route = createFileRoute('/{-$lang}/gallery')({
  loader: async ({ context: { locale } }) => ({ page: await loadGlobal('gallery', locale), locale }),
  head: ({ loaderData: d }) =>
    d ? seo({ locale: d.locale, page: 'gallery', title: d.page.meta?.title, description: d.page.meta?.description, image: media(d.page.hero?.image) }) : {},
  component: Gallery,
})

function Gallery() {
  const { page, locale } = Route.useLoaderData()
  const { hero, cta } = page
  const sections = (page.sections ?? []).map((s) => ({ ...s, photos: mediaList(s.images) })).filter((s) => s.photos.length)
  const [lb, setLb] = useState<{ title?: string | null; photos: Media[]; start: number } | null>(null)

  return (
    <>
      <PageHero image={media(hero?.image)} eyebrow={hero?.eyebrow} title={hero?.title} minH="min-h-[56vh]" />

      <div className="bg-cream px-[clamp(20px,6vw,72px)] pt-[clamp(64px,7vw,104px)] pb-[clamp(72px,8vw,120px)]">
        {sections.map((s, i) => (
          <section key={s.id} className={`mx-auto max-w-[1240px] ${i ? 'mt-[clamp(56px,6vw,88px)]' : ''}`}>
            <div className="mb-[30px] flex items-center gap-3.5">
              <h2 className="m-0 font-serif text-[30px] font-normal text-ink">{s.title}</h2>
              <span className="h-px flex-1 bg-[rgba(51,71,63,.16)]" />
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3.5">
              {s.photos.map((m, j) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setLb({ title: s.title, photos: s.photos, start: j })}
                  className="min-w-0 cursor-zoom-in overflow-hidden rounded-[2px] border-none bg-transparent p-0"
                >
                  <Img m={m} sizes="(min-width: 980px) 25vw, 50vw" className="aspect-[4/3] w-full transition-transform duration-500 hover:scale-[1.03]" />
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="bg-forest px-[clamp(20px,6vw,72px)] py-[clamp(72px,8vw,120px)] text-center">
        <div className="mx-auto max-w-[680px]">
          <h2 className="m-0 font-serif text-[clamp(32px,4.6vw,52px)] font-medium leading-[1.06] text-linen">{cta?.title}</h2>
          <PageLink locale={locale} page="contact" hash="booking" className={`${btnLight} mt-8 !px-[42px]`}>
            {cta?.buttonLabel}
          </PageLink>
        </div>
      </section>

      {lb && <Lightbox {...lb} onClose={() => setLb(null)} />}
    </>
  )
}
