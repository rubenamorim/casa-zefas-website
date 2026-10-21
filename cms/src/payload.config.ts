import { postgresAdapter } from '@payloadcms/db-postgres'
import { s3Storage } from '@payloadcms/storage-s3'
import { pt } from '@payloadcms/translations/languages/pt'
import { en } from '@payloadcms/translations/languages/en'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Media } from './collections/Media'
import { Units } from './collections/Units'
import { Users } from './collections/Users'
import { globals } from './globals'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const webUrl = process.env.WEB_URL || 'https://casazefas.pt'

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' · Villa Zefas' },
  },
  i18n: { supportedLanguages: { pt, en }, fallbackLanguage: 'pt' },
  localization: {
    locales: [
      { code: 'pt', label: 'Português' },
      { code: 'en', label: 'English' },
      { code: 'es', label: 'Español' },
    ],
    // Site default (served at /).
    defaultLocale: 'pt',
    fallback: true,
  },
  collections: [Units, Media, Users],
  globals,
  cors: [webUrl],
  secret: process.env.PAYLOAD_SECRET || '',
  // declare: false keeps payload-types.ts importable from ../web without the payload package.
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts'), declare: false },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '' },
  }),
  sharp,
  // Prod: Railway bucket (private; files served through Payload). Dev: local ./media when BUCKET unset.
  plugins: [
    s3Storage({
      enabled: !!process.env.BUCKET,
      collections: { media: true },
      bucket: process.env.BUCKET || '',
      config: {
        endpoint: process.env.ENDPOINT,
        region: process.env.REGION,
        credentials: {
          accessKeyId: process.env.ACCESS_KEY_ID || '',
          secretAccessKey: process.env.SECRET_ACCESS_KEY || '',
        },
      },
    }),
  ],
})
