import { createFileRoute } from '@tanstack/react-router'

import { Eyebrow, Img, PageHero, PageLink, btnSolid, h2 } from '#/components/ui'
import { loadGlobal, media } from '#/lib/cms'
import { seo } from '#/lib/site'

export const Route = createFileRoute('/{-$lang}/geres')({
  loader: async ({ context: { locale } }) => ({ page: await loadGlobal('geres', locale), locale }),
  head: ({ loaderData: d }) =>
    d ? seo({ locale: d.locale, page: 'geres', title: d.page.meta?.title, description: d.page.meta?.description, image: media(d.page.hero?.image) }) : {},
  component: Geres,
})

function Geres() {
  const { page, locale } = Route.useLoaderData()
  const { hero, activities, distances, cta } = page

  return (
    <>
      <PageHero image={media(hero?.image)} eyebrow={hero?.eyebrow} title={hero?.title} text={hero?.text} minH="min-h-[64vh]" />

      <section className="bg-cream px-[clamp(20px,6vw,72px)] py-[clamp(72px,9vw,130px)]">
        <div className="mx-auto max-w-[1240px]">
          <div data-reveal className="mb-[clamp(44px,5vw,68px)] max-w-[680px]">
            <Eyebrow className="mb-5">{activities?.eyebrow}</Eyebrow>
            <h2 className={`${h2} text-[clamp(32px,4.6vw,54px)] leading-[1.05]`}>{activities?.title}</h2>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] gap-[clamp(20px,2.4vw,32px)]">
            {activities?.items?.map((a) => (
              <article key={a.id} data-reveal className="overflow-hidden rounded-[2px] bg-card shadow-[0_1px_3px_rgba(44,58,53,.06)]">
                <Img m={media(a.image)} sizes="(min-width: 980px) 33vw, 100vw" className="block h-60 w-full" />
                <div className="px-[30px] pt-7 pb-8">
                  <span className="font-sans text-[11px] font-medium uppercase tracking-[.2em] text-bronze">{a.tag}</span>
                  <h3 className="mt-3 mb-0 font-serif text-[28px] font-medium leading-[1.1] text-ink">{a.title}</h3>
                  <p className="mt-3.5 mb-0 font-sans text-[15px] font-light leading-[1.78] text-body">{a.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-deep px-[clamp(20px,6vw,72px)] py-[clamp(64px,7vw,104px)]">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-[clamp(40px,5vw,60px)] text-center">
            <span className="font-sans text-xs font-medium uppercase tracking-[.34em] text-mist">{distances?.eyebrow}</span>
            <h2 className="mt-4 mb-0 font-serif text-[clamp(28px,4vw,44px)] font-medium leading-[1.1] text-linen">{distances?.title}</h2>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-[clamp(16px,2vw,28px)]">
            {distances?.items?.map((d) => (
              <div key={d.id} className="rounded-[2px] border border-[rgba(244,237,224,.16)] px-3 py-6 text-center">
                <span className="font-serif text-[clamp(30px,3.6vw,40px)] leading-none text-linen">{d.time}</span>
                <span className="mt-3 block font-sans text-sm font-light text-[rgba(231,224,210,.72)]">{d.place}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand px-[clamp(20px,6vw,72px)] py-[clamp(72px,8vw,120px)] text-center">
        <div data-reveal className="mx-auto max-w-[700px]">
          <h2 className={`${h2} text-[clamp(32px,4.8vw,56px)] leading-[1.05]`}>{cta?.title}</h2>
          <PageLink locale={locale} page="contact" hash="reservas" className={`${btnSolid} mt-[34px] !px-[42px] !py-[18px]`}>
            {cta?.buttonLabel}
          </PageLink>
        </div>
      </section>
    </>
  )
}
