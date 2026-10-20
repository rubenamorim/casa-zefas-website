import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Imagem', plural: 'Imagens' },
  access: { read: () => true },
  fields: [
    { name: 'alt', label: 'Descrição (acessibilidade)', type: 'text', localized: true },
    // Used by the seed script to avoid re-uploading the same file.
    { name: 'seedKey', type: 'text', index: true, admin: { hidden: true } },
  ],
  upload: {
    staticDir: process.env.MEDIA_DIR || 'media',
    mimeTypes: ['image/*'],
    focalPoint: true,
    imageSizes: [
      { name: 'thumb', width: 640 },
      { name: 'large', width: 1600 },
      { name: 'xl', width: 2400 },
    ],
    formatOptions: { format: 'webp', options: { quality: 82 } },
  },
}
