import { postgresAdapter } from '@payloadcms/db-postgres'
import { s3Storage } from '@payloadcms/storage-s3'
import { sharpTransformer } from '@payloadcms/transformer-sharp'
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

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
      importMapFile: path.resolve(dirname, '../routes/_payload/importMap.js'),
    },
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
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '' },
    migrationDir: path.resolve(dirname, 'migrations'),
    // Schema changes only via migrations (pnpm payload migrate:create), never dev auto-push.
    push: false,
  }),
  upload: {
    transformers: [
      sharpTransformer({
        sharp,
        collections: {
          media: {
            focalPoint: true,
            variants: [
              { name: 'thumb', width: 640 },
              { name: 'large', width: 1600 },
              { name: 'xl', width: 2400 },
            ],
            formatOptions: { format: 'webp', options: { quality: 82 } },
          },
        },
      }),
    ],
  },
  // Prod: Railway bucket (private; files served through Payload). Dev: local ./media when BUCKET unset.
  storage: [
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
