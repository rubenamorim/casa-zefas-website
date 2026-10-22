import type { CollectionConfig } from 'payload'

// Image variants and webp conversion live in sharpTransformer (payload.config.ts).
export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Imagem', plural: 'Imagens' },
  access: { read: () => true },
  fields: [
    { name: 'alt', label: 'Descrição (acessibilidade)', type: 'text', localized: true },
    // Used by the seed script to avoid re-uploading the same file.
    { name: 'seedKey', type: 'text', index: true, admin: { hidden: true } },
  ],
  upload: { mimeTypes: ['image/*'] },
}
