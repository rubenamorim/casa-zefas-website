import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'

import { Eyebrow, Img, Lines, PageHero, h2, useSite } from '#/components/ui'
import { loadGlobal, media } from '#/lib/cms'
import { seo } from '#/lib/site'

export const Route = createFileRoute('/{-$lang}/contact')({
  loader: async ({ context: { locale } }) => ({ page: await loadGlobal('contact', locale), locale }),
  head: ({ loaderData: d }) =>
    d ? seo({ locale: d.locale, page: 'contact', title: d.page.meta?.title, description: d.page.meta?.description, image: media(d.page.hero?.image) }) : {},
  component: Contact,
})

const label = 'font-sans text-[11px] font-medium uppercase tracking-[.18em] text-sage'
const big = 'mt-1 block font-serif text-[26px] text-forest no-underline'
const pill =
  'rounded-[40px] border border-[rgba(51,71,63,.28)] px-[22px] py-[11px] font-sans text-[12.5px] font-medium uppercase tracking-[.14em] text-forest no-underline transition-colors hover:bg-[rgba(51,71,63,.07)]'

function Contact() {
  const { page } = Route.useLoaderData()
  const site = useSite()
  const { hero, booking, details, map } = page
  const tel = site.phone ? `tel:${site.phone.replace(/\s/g, '')}` : undefined
  const whatsapp = site.whatsapp
    ? `https://wa.me/${site.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(site.whatsappMessage ?? '')}`
    : undefined

  return (
    <>
      <PageHero image={media(hero?.image)} eyebrow={hero?.eyebrow} title={hero?.title} minH="min-h-[52vh]" />

      <section id="booking" className="bg-cream px-[clamp(20px,6vw,72px)] py-[clamp(72px,9vw,130px)]">
        <div className="mx-auto flex max-w-[1080px] flex-wrap items-start gap-[clamp(36px,4vw,64px)]">
          <div className="min-w-[min(300px,100%)] flex-[1_1_360px]">
            <Eyebrow className="mb-[22px]">{booking?.eyebrow}</Eyebrow>
            <h2 className={`${h2} max-w-[14ch] text-[clamp(30px,4.2vw,48px)] leading-[1.05]`}>{booking?.title}</h2>
            <p className="mt-[22px] mb-0 max-w-[44ch] font-sans text-base font-light leading-[1.85] text-body">{booking?.text}</p>
            <ul className="m-0 mt-[30px] flex list-none flex-col gap-3.5 p-0">
              {booking?.perks?.map((p) => (
                <li key={p.id} className="flex items-center gap-[13px] font-sans text-[15px] font-light text-moss">
                  <span className="inline-block size-1.5 rounded-full bg-bronze" />
                  {p.text}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              {whatsapp && (
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener"
                  className="rounded-[1px] bg-forest px-[30px] py-[15px] font-sans text-[12.5px] font-medium uppercase tracking-[.16em] text-linen no-underline transition-colors hover:bg-forest-dark"
                >
                  {booking?.whatsappLabel}
                </a>
              )}
              {tel && (
                <a
                  href={tel}
                  className="rounded-[1px] border border-[rgba(51,71,63,.3)] bg-transparent px-[30px] py-[15px] font-sans text-[12.5px] font-medium uppercase tracking-[.16em] text-forest no-underline transition-colors hover:bg-[rgba(51,71,63,.06)]"
                >
                  {site.phone}
                </a>
              )}
            </div>
          </div>
          {booking?.widget ? (
            <Embed html={booking.widget} />
          ) : (
            // Placeholder until the Lodgify embed is pasted in the CMS.
            <div className="min-w-[min(300px,100%)] flex-[1_1_360px] rounded-[3px] border border-[rgba(51,71,63,.2)] bg-card px-7 py-[30px]">
              <div className="mb-[22px] flex gap-2.5">
                {[booking?.arrivalLabel, booking?.departureLabel].map((l, i) => (
                  <span
                    key={i}
                    className="flex h-12 flex-1 items-center justify-center rounded-[2px] border border-[rgba(51,71,63,.16)] font-sans text-[13px] text-sage"
                  >
                    {l}
                  </span>
                ))}
              </div>
              <a
                href={whatsapp ?? tel}
                target="_blank"
                rel="noopener"
                className="flex h-12 items-center justify-center rounded-[2px] bg-forest font-sans text-[12.5px] font-medium uppercase tracking-[.16em] text-linen no-underline transition-colors hover:bg-forest-dark"
              >
                {booking?.availabilityLabel}
              </a>
            </div>
          )}
        </div>
      </section>

      <section className="bg-sand px-[clamp(20px,6vw,72px)] py-[clamp(64px,8vw,120px)]">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-stretch gap-[clamp(32px,4vw,56px)]">
          <div className="flex min-w-[min(280px,100%)] flex-[1_1_320px] flex-col justify-center">
            <Eyebrow className="mb-[22px]">{details?.eyebrow}</Eyebrow>
            <h2 className={`${h2} text-[clamp(30px,4vw,46px)] leading-[1.06]`}>{details?.title}</h2>
            <div className="mt-[34px] flex flex-col gap-[22px]">
              {tel && (
                <div>
                  <span className={label}>{details?.phoneLabel}</span>
                  <a href={tel} className={big}>
                    {site.phone}
                  </a>
                </div>
              )}
              {site.email && (
                <div>
                  <span className={label}>{details?.emailLabel}</span>
                  <a href={`mailto:${site.email}`} className={`${big} break-all`}>
                    {site.email}
                  </a>
                </div>
              )}
              <div>
                <span className={label}>{details?.addressLabel}</span>
                <address className="mt-1.5 block font-sans text-base font-light leading-[1.6] not-italic text-moss">
                  <Lines text={site.address} />
                </address>
              </div>
              <div className="mt-1.5 flex gap-3">
                {site.instagramUrl && (
                  <a href={site.instagramUrl} target="_blank" rel="noopener" className={pill}>
                    Instagram
                  </a>
                )}
                {site.facebookUrl && (
                  <a href={site.facebookUrl} target="_blank" rel="noopener" className={pill}>
                    Facebook
                  </a>
                )}
              </div>
            </div>
          </div>

          <a
            href={site.mapsUrl ?? '#'}
            target="_blank"
            rel="noopener"
            className="relative block min-h-[380px] min-w-[min(300px,100%)] flex-[1_1_380px] overflow-hidden rounded-[3px] bg-[#cfd6cb] no-underline"
          >
            <Img m={media(map?.image)} sizes="50vw" className="absolute inset-0 size-full" />
            <span className="pointer-events-none absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2.5 rounded-[2px] bg-[rgba(35,47,43,.9)] px-[26px] py-[18px] text-center text-linen">
              <span className="font-serif text-[22px]">{map?.label}</span>
              <span className="font-sans text-[11px] font-medium uppercase tracking-[.16em] text-mist">{map?.linkLabel}</span>
            </span>
          </a>
        </div>
      </section>
    </>
  )
}

/** Booking widget pasted in the CMS (e.g. Lodgify). Scripts must be re-created to execute. */
function Embed({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.innerHTML = html
    el.querySelectorAll('script').forEach((old) => {
      const s = document.createElement('script')
      for (const a of old.attributes) s.setAttribute(a.name, a.value)
      s.text = old.text
      old.replaceWith(s)
    })
  }, [html])
  return <div ref={ref} className="min-w-[min(300px,100%)] flex-[1_1_360px]" />
}
