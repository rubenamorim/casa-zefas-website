import { bucket, defineRailway, github, postgres, preserve, project, ref, service } from 'railway/iac'

const repo = 'rubenamorim/casa-zefas-website'
const region = 'europe-west4'

export default defineRailway(() => {
  const db = postgres('postgres')

  // Uploaded images. Private; the app serves them via /api/media/file/*.
  const media = bucket('media', { region: 'ams' })

  // Site + Payload admin (/admin) + API (/api) in one TanStack Start app.
  const web = service('web', {
    source: github(repo, { branch: 'main', rootDirectory: 'web' }),
    build: 'pnpm build',
    start: 'pnpm start', // runs migrations, then the server
    replicas: { [region]: 1 },
    domains: ['casazefas.pt'],
    env: {
      PORT: '3000',
      VITE_SITE_URL: 'https://casazefas.pt',
      DATABASE_URL: db.env.DATABASE_URL,
      PAYLOAD_SECRET: preserve(), // set once in Railway dashboard, never in git
      BUCKET: ref(media, 'BUCKET'),
      ENDPOINT: ref(media, 'ENDPOINT'),
      REGION: ref(media, 'REGION'),
      ACCESS_KEY_ID: ref(media, 'ACCESS_KEY_ID'),
      SECRET_ACCESS_KEY: ref(media, 'SECRET_ACCESS_KEY'),
    },
  })

  return project('casa-zefas', { resources: [db, media, web] })
})
