import { createFileRoute } from '@tanstack/react-router'

import { Eyebrow, Img, PageHero, h2, useSite } from '#/components/ui'
import { loadGlobal, media } from '#/lib/cms'
import { seo } from '#/lib/site'

export const Route = createFileRoute('/{-$lang}/a-casa')({
  loader: async ({ context: { locale } }) => ({ page: await loadGlobal('house', locale), locale }),
  head: ({ loaderData: d }) =>
    d ? seo({ locale: d.locale, page: 'house', title: d.page.meta?.title, description: d.page.meta?.description, image: media(d.page.hero?.image) }) : {},
  component: House,
})

function House() {
  const { page } = Route.useLoaderData()
  const site = useSite()
  const { hero, story, values, quote } = page
  const paragraphs = (story?.text ?? '').split(/\n\s*\n/).filter(Boolean)

  return (
    <>
      <PageHero image={media(hero?.image)} eyebrow={hero?.eyebrow} title={hero?.title} />

      <section className="bg-cream px-[clamp(20px,6vw,72px)] py-[clamp(72px,9vw,130px)]">
        <div data-reveal className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-[clamp(36px,5vw,80px)]">
          <div className="min-w-[min(300px,100%)] flex-[1_1_360px]">
            <Eyebrow className="mb-[22px]">{story?.eyebrow}</Eyebrow>
            <h2 className={`${h2} max-w-[15ch] text-[clamp(30px,4.2vw,50px)] leading-[1.06]`}>{story?.title}</h2>
            {paragraphs.map((p, i) => (
              <p key={i} className={`${i ? 'mt-[18px]' : 'mt-6'} mb-0 font-sans text-base font-light leading-[1.9] text-body`}>
                {p}
              </p>
            ))}
          </div>
          <div className="flex min-w-[min(300px,100%)] flex-[1_1_360px] gap-4">
            <Img m={media(story?.image1)} sizes="30vw" className="h-[clamp(340px,46vw,520px)] min-w-0 flex-[1.2] rounded-[2px]" />
            <Img m={media(story?.image2)} sizes="25vw" className="h-[clamp(280px,38vw,420px)] min-w-0 flex-1 self-end rounded-[2px]" />
          </div>
        </div>
      </section>

      <section className="bg-sand px-[clamp(20px,6vw,72px)] py-[clamp(72px,9vw,130px)]">
        <div className="mx-auto max-w-[1240px]">
          <div data-reveal className="mb-[clamp(44px,5vw,68px)] text-center">
            <span className="font-sans text-xs font-medium uppercase tracking-[.34em] text-sage">{values?.eyebrow}</span>
            <h2 className={`${h2} mt-4 text-[clamp(30px,4.4vw,50px)] leading-[1.06]`}>{values?.title}</h2>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[clamp(24px,3vw,44px)]">
            {values?.items?.map((v) => (
              <div key={v.id} data-reveal className="px-[clamp(8px,1.5vw,20px)] text-center">
                <span className="font-serif text-[44px] leading-none text-bronze">{v.numeral}</span>
                <h3 className="mt-[18px] mb-0 font-serif text-[27px] font-medium leading-[1.12] text-ink">{v.title}</h3>
                <p className="mt-3.5 mb-0 font-sans text-[15px] font-light leading-[1.8] text-body">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest px-[clamp(20px,6vw,72px)] py-[clamp(76px,9vw,140px)] text-center">
        <figure data-reveal className="mx-auto my-0 max-w-[900px]">
          <Img m={media(site.logoLight)} className="mx-auto mb-[30px] h-16 w-auto !object-contain opacity-85" />
          <blockquote className="m-0 font-serif text-[clamp(26px,3.6vw,42px)] font-medium leading-[1.38] italic text-linen">{quote?.text}</blockquote>
          <figcaption className="mt-[30px] font-sans text-[13px] uppercase tracking-[.2em] text-mist">{quote?.author}</figcaption>
        </figure>
      </section>
    </>
  )
}
