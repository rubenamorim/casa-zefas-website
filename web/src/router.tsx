import { payloadParseSearch, payloadStringifySearch } from '@payloadcms/tanstack-start/shared'
import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  return createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: 'intent',
    // Payload admin needs its own search param (de)serialization.
    parseSearch: payloadParseSearch,
    stringifySearch: payloadStringifySearch,
    // Inline styles: a 404 thrown above /{-$lang} renders without the site CSS.
    defaultNotFoundComponent: () => (
      <div
        style={{
          display: 'grid',
          minHeight: '100vh',
          placeItems: 'center',
          background: '#f6f1e7',
          color: '#2c3a35',
          font: '1.875rem Georgia, serif',
        }}
      >
        404
      </div>
    ),
  })
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
