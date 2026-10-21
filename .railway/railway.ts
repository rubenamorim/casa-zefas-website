import { bucket, defineRailway, github, postgres, preserve, project, ref, service } from 'railway/iac'

const repo = 'rubenamorim/casa-zefas-website'
const region = 'europe-west4'

export default defineRailway(() => {
  const db = postgres('postgres')

  // Uploaded images. Private; cms serves them via /api/media/file/*.
  const media = bucket('media', { region: 'ams' })

  const cms = service('cms', {
    source: github(repo, { branch: 'main', rootDirectory: 'cms' }),
    build: 'pnpm build',
    start: 'pnpm start', // runs migrations, then next start
    replicas: { [region]: 1 },
    domains: ['cms.casazefas.pt'],
    env: {
      PORT: '3000',
      DATABASE_URL: db.env.DATABASE_URL,
      PAYLOAD_SECRET: preserve(), // set once in Railway dashboard, never in git
      WEB_URL: 'https://casazefas.pt',
      BUCKET: ref(media, 'BUCKET'),
      ENDPOINT: ref(media, 'ENDPOINT'),
      REGION: ref(media, 'REGION'),
      ACCESS_KEY_ID: ref(media, 'ACCESS_KEY_ID'),
      SECRET_ACCESS_KEY: ref(media, 'SECRET_ACCESS_KEY'),
    },
  })

  const web = service('web', {
    source: github(repo, { branch: 'main', rootDirectory: 'web' }),
    build: 'pnpm build',
    start: 'pnpm start',
    replicas: { [region]: 1 },
    domains: ['casazefas.pt'],
    env: {
      PORT: '3000',
      CMS_URL: 'http://${{cms.RAILWAY_PRIVATE_DOMAIN}}:3000',
      CMS_PUBLIC_URL: 'https://cms.casazefas.pt',
      VITE_SITE_URL: 'https://casazefas.pt',
    },
  })

  return project('casa-zefas', { resources: [db, media, cms, web] })
})
