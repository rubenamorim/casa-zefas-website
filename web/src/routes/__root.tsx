import { withPayloadRoot } from '@payloadcms/tanstack-start/client'
import { HeadContent, Scripts, createRootRoute, useParams } from '@tanstack/react-router'

// Site styles/fonts live on /{-$lang} so they don't leak into the Payload admin.
export const Route = createRootRoute({
  head: () => ({
    meta: [{ charSet: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  }),
  shellComponent: withPayloadRoot(RootDocument),
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const { lang } = useParams({ strict: false })
  return (
    <html lang={lang === 'en' || lang === 'es' ? lang : 'pt'} suppressHydrationWarning>
      <head>
        {/* Enables scroll-reveal CSS only when JS runs, so content never stays hidden. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
