import type { Field, GroupField } from 'payload'

// Localized text / textarea. Every visible string on the site uses one of these.
export const text = (name: string, label?: string, required = false): Field => ({
  name,
  label,
  type: 'text',
  localized: true,
  required,
})

export const textarea = (name: string, label?: string): Field => ({
  name,
  label,
  type: 'textarea',
  localized: true,
})

export const image = (name: string, label?: string): Field => ({
  name,
  label,
  type: 'upload',
  relationTo: 'media',
})

export const images = (name: string, label?: string): Field => ({
  name,
  label,
  type: 'upload',
  relationTo: 'media',
  hasMany: true,
})

export const group = (name: string, label: string, fields: Field[]): GroupField => ({
  name,
  label,
  type: 'group',
  fields,
})

export const hero = (withText = false): GroupField =>
  group('hero', 'Topo da página', [
    image('image', 'Imagem de fundo'),
    text('eyebrow', 'Etiqueta'),
    text('title', 'Título'),
    ...(withText ? [textarea('text', 'Texto')] : []),
  ])

export const seo: GroupField = group('meta', 'SEO (Google)', [
  text('title', 'Título da página'),
  textarea('description', 'Descrição'),
])
