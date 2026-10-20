import { media, type Globals, type Locale } from '#/lib/cms'
import { pageKeys } from '#/lib/site'
import { Img, Lines, PageLink } from './ui'

const h4 = 'm-0 mb-[22px] font-sans text-[11px] font-medium uppercase tracking-[.28em] text-[rgba(231,224,210,.5)]'
const link = 'font-sans text-[15px] font-light text-[#e7e0d2] no-underline hover:text-white'

export function Footer({ site, locale }: { site: Globals['site']; locale: Locale }) {
  const socials = [
    ['Instagram', site.instagramUrl],
    ['Facebook', site.facebookUrl],
  ].filter(([, href]) => href)
  return (
    <footer className="bg-deep px-[clamp(18px,6vw,72px)] pt-[clamp(64px,7vw,104px)] pb-8 text-[#e7e0d2]">
      <div className="mx-auto flex max-w-[1240px] flex-wrap justify-between gap-[clamp(40px,6vw,96px)]">
        <div className="max-w-[380px] flex-[1_1_300px]">
          <div className="flex items-center gap-3.5">
            <Img m={media(site.logoLight)} className="h-[54px] w-[46px] !object-contain" />
            <span className="flex flex-col leading-none">
              <span className="font-serif text-2xl font-semibold tracking-[.17em] text-linen">{site.brandName}</span>
              <span className="mt-1.5 font-sans text-[9.5px] tracking-[.42em] text-[rgba(231,224,210,.6)]">{site.tagline}</span>
            </span>
          </div>
          <p className="mt-[26px] mb-0 font-sans text-[15px] font-light leading-[1.85] text-[rgba(231,224,210,.72)]">{site.footerIntro}</p>
        </div>

        <div className="flex-[0_1_160px]">
          <h4 className={h4}>{site.footerNavTitle}</h4>
          <nav className="flex flex-col gap-[13px]">
            {pageKeys.map((page) => (
              <PageLink key={page} locale={locale} page={page} className={link}>
                {site.nav?.[page]}
              </PageLink>
            ))}
          </nav>
        </div>

        <div className="flex-[0_1_220px]">
          <h4 className={h4}>{site.footerContactTitle}</h4>
          <div className="flex flex-col gap-3.5 font-sans text-[15px] font-light leading-normal text-[rgba(231,224,210,.82)]">
            <address className="not-italic">
              <Lines text={site.address} />
            </address>
            {site.phone && (
              <a href={`tel:${site.phone.replace(/\s/g, '')}`} className={link}>
                {site.phone}
              </a>
            )}
            {site.email && (
              <a href={`mailto:${site.email}`} className={link}>
                {site.email}
              </a>
            )}
          </div>
        </div>

        <div className="flex-[0_1_180px]">
          <h4 className={h4}>{site.footerFollowTitle}</h4>
          <div className="flex flex-col gap-[13px]">
            {socials.map(([label, href]) => (
              <a key={label} href={href!} target="_blank" rel="noopener" className={`${link} flex items-center gap-[11px]`}>
                <span className="inline-block size-1.5 rounded-full bg-mist" />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-[clamp(48px,6vw,80px)] max-w-[1240px] border-t border-[rgba(231,224,210,.14)] pt-7">
        <span className="font-sans text-[12.5px] font-light tracking-[.04em] text-[rgba(231,224,210,.55)]">{site.copyright}</span>
      </div>
    </footer>
  )
}
