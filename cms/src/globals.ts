import type { GlobalConfig } from 'payload'

import { group, hero, image, images, seo, text, textarea } from './fields'

const publicRead = { read: () => true }

export const Site: GlobalConfig = {
  slug: 'site',
  label: 'Geral (cabeçalho, rodapé, contactos)',
  access: publicRead,
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Marca',
          fields: [
            text('brandName', 'Nome'),
            text('tagline', 'Subtítulo do logótipo'),
            image('logoLight', 'Logótipo claro (sobre fotografias)'),
            image('logoDark', 'Logótipo escuro (sobre fundo claro)'),
          ],
        },
        {
          label: 'Menu',
          fields: [
            group('nav', 'Itens do menu', [
              text('home', 'Início'),
              text('stay', 'Alojamento'),
              text('house', 'A Casa'),
              text('geres', 'O Gerês'),
              text('gallery', 'Galeria'),
              text('contact', 'Contactos'),
            ]),
            text('bookLabel', 'Botão de reserva'),
          ],
        },
        {
          label: 'Contactos',
          fields: [
            { name: 'phone', label: 'Telefone (como aparece)', type: 'text' },
            { name: 'email', label: 'Email', type: 'email' },
            textarea('address', 'Morada'),
            {
              name: 'whatsapp',
              label: 'Número WhatsApp (só dígitos, com indicativo — ex: 351914435941)',
              type: 'text',
            },
            textarea('whatsappMessage', 'Mensagem pré-preenchida no WhatsApp'),
            { name: 'instagramUrl', label: 'Instagram (link)', type: 'text' },
            { name: 'instagramHandle', label: 'Instagram (@nome)', type: 'text' },
            { name: 'facebookUrl', label: 'Facebook (link)', type: 'text' },
            { name: 'mapsUrl', label: 'Google Maps (link)', type: 'text' },
          ],
        },
        {
          label: 'Comodidades',
          fields: [
            {
              name: 'amenities',
              label: 'Comodidades (Início e Alojamento)',
              type: 'array',
              fields: [text('label', 'Comodidade', true)],
            },
          ],
        },
        {
          label: 'Rodapé',
          fields: [
            textarea('footerIntro', 'Texto de apresentação'),
            text('footerNavTitle', 'Título “Navegar”'),
            text('footerContactTitle', 'Título “Contactos”'),
            text('footerFollowTitle', 'Título “Seguir”'),
            text('copyright', 'Direitos de autor'),
          ],
        },
      ],
    },
  ],
}

export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Página: Início',
  access: publicRead,
  fields: [
    group('hero', 'Topo da página', [
      image('image', 'Imagem de fundo'),
      text('eyebrow', 'Etiqueta'),
      text('title', 'Título'),
      textarea('text', 'Texto'),
      text('primaryCta', 'Botão principal'),
      text('secondaryCta', 'Botão secundário'),
      text('arrivalLabel', 'Barra de reserva: “Chegada”'),
      text('departureLabel', 'Barra de reserva: “Saída”'),
      text('selectDateLabel', 'Barra de reserva: “Selecionar data”'),
      text('availabilityLabel', 'Barra de reserva: botão'),
    ]),
    group('intro', 'Boas-vindas', [
      text('eyebrow', 'Etiqueta'),
      textarea('text', 'Texto'),
      text('signature', 'Assinatura'),
    ]),
    group('units', 'Alojamento', [
      text('eyebrow', 'Etiqueta'),
      text('title', 'Título'),
      text('linkLabel', 'Link'),
      text('soonBadge', 'Selo “Em breve”'),
    ]),
    group('amenities', 'Comodidades', [text('eyebrow', 'Etiqueta'), text('title', 'Título')]),
    group('news', 'Novidades', [
      text('eyebrow', 'Etiqueta'),
      text('title', 'Título'),
      textarea('text', 'Texto'),
      text('badge', 'Selo dos cartões'),
      {
        name: 'items',
        label: 'Cartões',
        type: 'array',
        fields: [text('title', 'Título'), textarea('text', 'Texto')],
      },
    ]),
    group('geres', 'O Gerês', [
      text('eyebrow', 'Etiqueta'),
      text('title', 'Título'),
      textarea('text', 'Texto'),
      {
        name: 'stats',
        label: 'Números',
        type: 'array',
        fields: [text('value', 'Valor'), text('label', 'Legenda')],
      },
      text('linkLabel', 'Link'),
      image('image1', 'Imagem 1'),
      image('image2', 'Imagem 2'),
    ]),
    group('gallery', 'Galeria', [
      text('eyebrow', 'Etiqueta'),
      text('title', 'Título'),
      images('images', 'Fotografias'),
      text('linkLabel', 'Link'),
    ]),
    group('reviews', 'Avaliações', [
      text('eyebrow', 'Etiqueta'),
      text('title', 'Título'),
      {
        name: 'items',
        label: 'Avaliações',
        type: 'array',
        fields: [textarea('quote', 'Texto'), text('name', 'Nome'), text('where', 'Origem')],
      },
    ]),
    group('cta', 'Chamada final', [
      text('eyebrow', 'Etiqueta'),
      text('title', 'Título'),
      textarea('text', 'Texto'),
      text('buttonLabel', 'Botão'),
    ]),
    seo,
  ],
}

export const Stay: GlobalConfig = {
  slug: 'stay',
  label: 'Página: Alojamento',
  access: publicRead,
  fields: [
    hero(true),
    textarea('intro', 'Frase de introdução'),
    group('labels', 'Textos dos cartões', [
      text('soonBadge', 'Selo “Em breve”'),
      text('viewPhotos', 'Botão “Ver fotos”'),
      text('photos', 'Palavra “fotos”'),
      text('soonNote', '“Brevemente disponível”'),
      text('book', 'Botão “Reservar”'),
    ]),
    group('amenities', 'Comodidades', [text('eyebrow', 'Etiqueta'), text('title', 'Título')]),
    group('cta', 'Chamada final', [
      text('title', 'Título'),
      textarea('text', 'Texto'),
      text('buttonLabel', 'Botão'),
    ]),
    seo,
  ],
}

export const House: GlobalConfig = {
  slug: 'house',
  label: 'Página: A Casa',
  access: publicRead,
  fields: [
    hero(),
    group('story', 'A nossa história', [
      text('eyebrow', 'Etiqueta'),
      text('title', 'Título'),
      textarea('text', 'Texto (linha em branco separa parágrafos)'),
      image('image1', 'Imagem 1'),
      image('image2', 'Imagem 2'),
    ]),
    group('values', 'Valores', [
      text('eyebrow', 'Etiqueta'),
      text('title', 'Título'),
      {
        name: 'items',
        label: 'Valores',
        type: 'array',
        fields: [text('numeral', 'Número'), text('title', 'Título'), textarea('text', 'Texto')],
      },
    ]),
    group('quote', 'Citação', [textarea('text', 'Citação'), text('author', 'Autor')]),
    seo,
  ],
}

export const Geres: GlobalConfig = {
  slug: 'geres',
  label: 'Página: O Gerês',
  access: publicRead,
  fields: [
    hero(true),
    group('activities', 'Atividades', [
      text('eyebrow', 'Etiqueta'),
      text('title', 'Título'),
      {
        name: 'items',
        label: 'Atividades',
        type: 'array',
        fields: [
          image('image', 'Imagem'),
          text('tag', 'Etiqueta'),
          text('title', 'Título'),
          textarea('text', 'Texto'),
        ],
      },
    ]),
    group('distances', 'Distâncias', [
      text('eyebrow', 'Etiqueta'),
      text('title', 'Título'),
      {
        name: 'items',
        label: 'Distâncias',
        type: 'array',
        fields: [text('time', 'Tempo'), text('place', 'Local')],
      },
    ]),
    group('cta', 'Chamada final', [text('title', 'Título'), text('buttonLabel', 'Botão')]),
    seo,
  ],
}

export const Gallery: GlobalConfig = {
  slug: 'gallery',
  label: 'Página: Galeria',
  access: publicRead,
  fields: [
    hero(),
    {
      name: 'sections',
      label: 'Secções',
      type: 'array',
      fields: [text('title', 'Título'), images('images', 'Fotografias')],
    },
    group('cta', 'Chamada final', [text('title', 'Título'), text('buttonLabel', 'Botão')]),
    seo,
  ],
}

export const Contact: GlobalConfig = {
  slug: 'contact',
  label: 'Página: Contactos',
  access: publicRead,
  fields: [
    hero(),
    group('booking', 'Reservas', [
      text('eyebrow', 'Etiqueta'),
      text('title', 'Título'),
      textarea('text', 'Texto'),
      {
        name: 'perks',
        label: 'Vantagens',
        type: 'array',
        fields: [text('text', 'Vantagem')],
      },
      text('whatsappLabel', 'Botão WhatsApp'),
      {
        name: 'widget',
        label: 'Código do widget de reservas (Lodgify) — vazio mostra o bloco provisório abaixo',
        type: 'code',
        admin: { language: 'html' },
      },
      text('arrivalLabel', 'Bloco provisório: “Chegada”'),
      text('departureLabel', 'Bloco provisório: “Saída”'),
      text('availabilityLabel', 'Bloco provisório: botão (abre WhatsApp)'),
    ]),
    group('details', 'Contactos', [
      text('eyebrow', 'Etiqueta'),
      text('title', 'Título'),
      text('phoneLabel', '“Telefone”'),
      text('emailLabel', '“Email”'),
      text('addressLabel', '“Morada”'),
    ]),
    group('map', 'Mapa', [
      image('image', 'Imagem do mapa'),
      text('label', 'Local'),
      text('linkLabel', 'Link'),
    ]),
    seo,
  ],
}

export const globals = [Site, Home, Stay, House, Geres, Gallery, Contact]
