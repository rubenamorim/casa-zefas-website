import type { CollectionConfig } from 'payload'

import { image, images, text, textarea } from '../fields'

export const Units: CollectionConfig = {
  slug: 'units',
  labels: { singular: 'Casa', plural: 'Casas' },
  access: { read: () => true },
  defaultSort: 'order',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'comingSoon', 'order'] },
  fields: [
    text('name', 'Nome', true),
    {
      name: 'comingSoon',
      label: 'Em breve (ainda não disponível para reserva)',
      type: 'checkbox',
      defaultValue: false,
    },
    { name: 'order', label: 'Ordem', type: 'number', defaultValue: 0 },
    image('image', 'Imagem principal'),
    images('gallery', 'Fotografias (galeria da casa)'),
    {
      type: 'collapsible',
      label: 'Cartão na página Início',
      fields: [
        text('cardLabel', 'Etiqueta'),
        textarea('summary', 'Resumo'),
        text('cardCapacity', 'Capacidade'),
      ],
    },
    {
      type: 'collapsible',
      label: 'Página Alojamento',
      fields: [
        text('kicker', 'Etiqueta'),
        textarea('description', 'Descrição'),
        text('capacity', 'Capacidade'),
        { name: 'tags', label: 'Características', type: 'array', fields: [text('label', 'Texto')] },
      ],
    },
  ],
}
