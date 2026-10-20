// Initial PT content, copied from the Claude Design files. Strings starting with "img:" are
// replaced by uploaded media IDs (file in ./images). en.ts / es.ts mirror this exact shape.
export default {
  site: {
    brandName: 'VILLA ZEFAS',
    tagline: 'CASA DE CAMPO · GERÊS',
    logoLight: 'img:logo-white.png',
    logoDark: 'img:logo-green.png',
    nav: {
      home: 'Início',
      stay: 'Alojamento',
      house: 'A Casa',
      geres: 'O Gerês',
      gallery: 'Galeria',
      contact: 'Contactos',
    },
    bookLabel: 'Reservar',
    phone: '+351 914 435 941',
    email: 'casadoszefas@gmail.com',
    address: 'Vidoeiro · 4845-081 Gerês\nVilar da Veiga, Terras de Bouro',
    whatsapp: '351914435941',
    whatsappMessage: 'Olá Villa Zefas! Gostaria de saber a disponibilidade da Casa dos Zefas.',
    instagramUrl: 'https://www.instagram.com/casa_zefas_geres/',
    instagramHandle: '@casa_zefas_geres',
    facebookUrl: 'https://www.facebook.com/casadoszefas/',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=41.7341875,-8.1580625',
    amenities: [
      'Jacuzzi',
      'Sauna',
      'Bicicletas para alugar',
      'Piscina exterior',
      'Churrasqueira',
      'Estacionamento',
      'Wi‑Fi gratuito',
      'Cozinha equipada',
      'Máquina de café',
      'Máquina de lavar loiça',
      'Aberto todo o ano',
    ].map((label) => ({ label })),
    footerIntro:
      'Casas de campo em pedra, no coração do Parque Nacional da Peneda-Gerês. Para quem procura silêncio, serra e o conforto de estar em casa.',
    footerNavTitle: 'Navegar',
    footerContactTitle: 'Contactos',
    footerFollowTitle: 'Seguir',
    copyright: '© 2026 Villa Zefas — Casa de Campo, Gerês. Todos os direitos reservados.',
  },

  home: {
    hero: {
      image: 'img:casa-dos-zefas-exterior.jpg',
      eyebrow: 'Casa de Campo · Gerês',
      title: 'Onde a serra se faz casa.',
      text: 'Casas de campo no coração do Parque Nacional da Peneda‑Gerês, com piscina e a serra à porta. Silêncio, natureza e o conforto de estar em casa.',
      primaryCta: 'Ver o alojamento',
      secondaryCta: 'Reservar estadia',
      arrivalLabel: 'Chegada',
      departureLabel: 'Saída',
      selectDateLabel: 'Selecionar data',
      availabilityLabel: 'Disponibilidade',
    },
    intro: {
      eyebrow: 'Bem-vindo',
      text: 'Acordar com a serra à janela, o som do ribeiro e o cheiro a lenha na lareira. A Villa Zefas é um refúgio de pedra onde o tempo abranda — feito para descansar, caminhar e voltar a si.',
      signature: '— A família Zefas',
    },
    units: {
      eyebrow: 'O Alojamento',
      title: 'Uma casa hoje, três em breve.',
      linkLabel: 'Ver alojamento →',
      soonBadge: 'Em breve',
    },
    amenities: { eyebrow: 'Comodidades', title: 'Tudo o que precisa, já incluído.' },
    news: {
      eyebrow: 'Em breve na casa',
      title: 'Jacuzzi, sauna e bicicletas.',
      text: 'Estamos a acrescentar três novidades pensadas para o descanso depois de um dia de serra — e para explorar o Gerês sobre duas rodas.',
      badge: 'Novidade',
      items: [
        { title: 'Jacuzzi', text: 'Água quente ao ar livre, com a serra em frente. Para acabar o dia devagar.' },
        { title: 'Sauna', text: 'Calor seco para relaxar os músculos depois dos trilhos.' },
        {
          title: 'Bicicletas para alugar',
          text: 'Bicicletas disponíveis na casa, para sair à descoberta sem depender do carro.',
        },
      ],
    },
    geres: {
      eyebrow: 'A Envolvente',
      title: 'O Gerês começa à sua porta.',
      text: 'Trilhos entre carvalhos, cascatas de água cristalina, miradouros sobre a albufeira e aldeias de pedra paradas no tempo. Tudo a poucos minutos da casa.',
      stats: [
        { value: '+30', label: 'Trilhos' },
        { value: '5 min', label: 'Até ao rio' },
        { value: '100%', label: 'Natureza' },
      ],
      linkLabel: 'Descobrir o Gerês →',
      image1: 'img:casa-dos-zefas-piscina.jpg',
      image2: 'img:casa-dos-zefas-exterior.jpg',
    },
    gallery: {
      eyebrow: 'Galeria',
      title: 'Momentos na casa.',
      images: [
        'img:casa-dos-zefas-sala-estar.jpg',
        'img:casa-dos-zefas-cozinha.jpg',
        'img:casa-dos-zefas-quarto-casal.jpg',
        'img:casa-dos-zefas-quarto-triplo.jpg',
        'img:casa-dos-zefas-piscina.jpg',
        'img:casa-dos-zefas-exterior.jpg',
        'img:casa-dos-zefas-wc.jpg',
      ],
      linkLabel: 'Ver galeria completa →',
    },
    reviews: {
      eyebrow: 'Hóspedes',
      title: 'Quem cá ficou, conta.',
      items: [
        {
          quote: 'Um cantinho de paz. Acordar com a serra à janela não tem preço — voltaremos de certeza.',
          name: 'Marta & João',
          where: 'Porto',
        },
        {
          quote: 'A casa é linda, quentinha e cheia de pormenores. Anfitriões cinco estrelas.',
          name: 'Sophie L.',
          where: 'França',
        },
        {
          quote: 'Perfeita para desligar. Trilhos incríveis à porta e a lareira ao fim do dia.',
          name: 'Ricardo M.',
          where: 'Lisboa',
        },
      ],
    },
    cta: {
      eyebrow: 'Reservas Diretas',
      title: 'Pronto para ficar connosco?',
      text: 'Reserve diretamente e sem intermediários. Responda-nos com as suas datas e tratamos de tudo.',
      buttonLabel: 'Pedir reserva',
    },
    meta: {
      title: 'Villa Zefas — Casa de Campo no Gerês',
      description:
        'Casas de campo em pedra no coração do Parque Nacional da Peneda-Gerês, com piscina e a serra à porta.',
    },
  },

  stay: {
    hero: {
      image: 'img:casa-dos-zefas-exterior.jpg',
      eyebrow: 'O Alojamento',
      title: 'As nossas casas.',
      text: 'Hoje, a Casa dos Zefas — uma villa T2 com piscina. Em breve, três refúgios no mesmo recanto do Gerês.',
    },
    intro: 'Uma casa a abrir caminho, três a chegar. Conheça a Casa dos Zefas.',
    labels: {
      soonBadge: 'Em breve',
      viewPhotos: 'Ver fotos',
      photos: 'fotos',
      soonNote: 'Brevemente disponível',
      book: 'Reservar',
    },
    amenities: { eyebrow: 'Em todas as casas', title: 'Comodidades incluídas.' },
    cta: {
      title: 'Ainda em dúvida sobre qual escolher?',
      text: 'Diga-nos quantos são e as datas — ajudamos a encontrar a casa certa para si.',
      buttonLabel: 'Falar connosco',
    },
    meta: { title: 'Alojamento — Villa Zefas', description: 'A Casa dos Zefas: villa T2 em pedra com piscina, no Gerês.' },
  },

  house: {
    hero: {
      image: 'img:casa-dos-zefas-exterior.jpg',
      eyebrow: 'A Casa',
      title: 'Uma história de pedra e serra.',
    },
    story: {
      eyebrow: 'A nossa história',
      title: 'Recuperada com as mãos, habitada com o coração.',
      text: 'A Villa Zefas nasceu do desejo de devolver vida a um conjunto de casas de pedra da família, no sopé da serra do Gerês. Pedra a pedra, madeira a madeira, recuperámos a traça original sem lhe roubar a alma.\n\nHoje, abrimos as portas a quem procura o mesmo que nós: o silêncio da montanha, o calor de uma lareira e o tempo para não fazer nada.',
      image1: 'img:casa-dos-zefas-exterior.jpg',
      image2: 'img:casa-dos-zefas-sala-estar.jpg',
    },
    values: {
      eyebrow: 'O que nos move',
      title: 'Três promessas simples.',
      items: [
        {
          numeral: 'I',
          title: 'Autenticidade',
          text: 'Pedra à vista, madeira e materiais naturais. Mantivemos a alma de cada casa — só lhe acrescentámos conforto.',
        },
        {
          numeral: 'II',
          title: 'Sossego',
          text: 'Sem ruído, sem pressa. Apenas a serra, o ribeiro e o tempo a passar mais devagar.',
        },
        {
          numeral: 'III',
          title: 'Proximidade',
          text: 'Reservas diretas e anfitriões presentes. Tratamos de tudo para que só tenha de descansar.',
        },
      ],
    },
    quote: {
      text: '"Não construímos um alojamento. Cuidámos de uma casa, para que se sinta nela como em sua casa."',
      author: 'A família Zefas',
    },
    meta: { title: 'A Casa — Villa Zefas', description: 'A história da Villa Zefas, casas de pedra da família no Gerês.' },
  },

  geres: {
    hero: {
      image: 'img:casa-dos-zefas-piscina.jpg',
      eyebrow: 'A Envolvente',
      title: 'O Gerês à sua espera.',
      text: 'O único Parque Nacional de Portugal — montanhas, cascatas, lagoas e aldeias de pedra. Tudo a poucos minutos da casa.',
    },
    activities: {
      eyebrow: 'Para fazer',
      title: 'Dias que valem a viagem.',
      items: [
        {
          image: 'img:casa-dos-zefas-exterior.jpg',
          tag: 'A pé',
          title: 'Trilhos & Miradouros',
          text: 'Dezenas de percursos pedestres entre carvalhais e granito, com miradouros de cortar a respiração sobre os vales.',
        },
        {
          image: 'img:casa-dos-zefas-piscina.jpg',
          tag: 'Água',
          title: 'Cascatas & Poços',
          text: 'Quedas de água e poços de água cristalina escondidos na mata — perfeitos para um mergulho no verão.',
        },
        {
          image: 'img:casa-dos-zefas-piscina.jpg',
          tag: 'Lago',
          title: 'Albufeira da Caniçada',
          text: 'Paddle, caiaque ou simplesmente um piquenique à beira de água, com a serra refletida na albufeira.',
        },
        {
          image: 'img:casa-dos-zefas-exterior.jpg',
          tag: 'Cultura',
          title: 'Aldeias de Pedra',
          text: 'Aldeias paradas no tempo, espigueiros, capelas e o ritmo antigo das gentes da serra.',
        },
        {
          image: 'img:casa-dos-zefas-exterior.jpg',
          tag: 'Natureza',
          title: 'Mata da Albergaria',
          text: 'Uma das florestas mais bem preservadas da Europa, parte da antiga Geira romana.',
        },
        {
          image: 'img:casa-dos-zefas-cozinha.jpg',
          tag: 'À mesa',
          title: 'Gastronomia',
          text: 'Cabrito assado, broa, mel e vinho verde nas tascas e restaurantes da região.',
        },
      ],
    },
    distances: {
      eyebrow: 'Perto de tudo',
      title: 'À distância de um passeio.',
      items: [
        { time: '5 min', place: 'Rio e trilhos' },
        { time: '15 min', place: 'Albufeira da Caniçada' },
        { time: '25 min', place: 'Vila do Gerês' },
        { time: '50 min', place: 'Braga' },
        { time: '1h30', place: 'Porto' },
      ],
    },
    cta: { title: 'A serra fica melhor com casa para voltar.', buttonLabel: 'Reservar a sua estadia' },
    meta: { title: 'O Gerês — Villa Zefas', description: 'Trilhos, cascatas, albufeiras e aldeias de pedra a minutos da Villa Zefas.' },
  },

  gallery: {
    hero: { image: 'img:casa-dos-zefas-piscina.jpg', eyebrow: 'Galeria', title: 'Veja por dentro.' },
    sections: [
      {
        title: 'As casas',
        images: ['img:casa-dos-zefas-exterior.jpg', 'img:casa-dos-zefas-piscina.jpg'],
      },
      {
        title: 'Interiores',
        images: [
          'img:casa-dos-zefas-sala-estar.jpg',
          'img:casa-dos-zefas-quarto-casal.jpg',
          'img:casa-dos-zefas-cozinha.jpg',
          'img:casa-dos-zefas-quarto-triplo.jpg',
          'img:casa-dos-zefas-wc.jpg',
        ],
      },
      { title: 'A envolvente', images: ['img:casa-dos-zefas-exterior.jpg', 'img:casa-dos-zefas-piscina.jpg'] },
    ],
    cta: { title: 'Estas paredes ficam à sua espera.', buttonLabel: 'Reservar estadia' },
    meta: { title: 'Galeria — Villa Zefas', description: 'Fotografias da Casa dos Zefas e da serra do Gerês.' },
  },

  contact: {
    hero: {
      image: 'img:casa-dos-zefas-exterior.jpg',
      eyebrow: 'Contactos & Reservas',
      title: 'Venha ficar connosco.',
    },
    booking: {
      eyebrow: 'Reservas Diretas',
      title: 'Reserve sem intermediários.',
      text: 'Consulte a disponibilidade da Casa dos Zefas e garanta as suas datas. Ao reservar diretamente connosco, tem sempre o melhor preço.',
      perks: [
        { text: 'Melhor preço garantido' },
        { text: 'Sem taxas de plataforma' },
        { text: 'Contacto direto com os anfitriões' },
      ],
      whatsappLabel: 'Reservar por WhatsApp',
      arrivalLabel: 'Chegada',
      departureLabel: 'Saída',
      availabilityLabel: 'Ver disponibilidade',
    },
    details: {
      eyebrow: 'Falar connosco',
      title: 'Estamos a um toque.',
      phoneLabel: 'Telefone',
      emailLabel: 'Email',
      addressLabel: 'Morada',
    },
    map: { label: 'Vidoeiro · Caldas do Gerês', linkLabel: 'Abrir no Google Maps →' },
    meta: { title: 'Contactos & Reservas — Villa Zefas', description: 'Reserve diretamente a Casa dos Zefas, no Gerês.' },
  },

  units: [
    {
      name: 'Casa dos Zefas',
      comingSoon: false,
      order: 1,
      image: 'img:casa-dos-zefas-exterior.jpg',
      gallery: [
        'img:casa-dos-zefas-exterior.jpg',
        'img:casa-dos-zefas-piscina.jpg',
        'img:casa-dos-zefas-sala-estar.jpg',
        'img:casa-dos-zefas-cozinha.jpg',
        'img:casa-dos-zefas-quarto-casal.jpg',
        'img:casa-dos-zefas-quarto-triplo.jpg',
        'img:casa-dos-zefas-wc.jpg',
      ],
      cardLabel: 'Disponível',
      summary:
        'A nossa casa de pedra: dois quartos, sala, cozinha equipada, piscina exterior e churrasqueira. Aberta todo o ano.',
      cardCapacity: 'T2 · até 5 hóspedes',
      kicker: 'T2 · Casa de pedra · até 5 hóspedes',
      description:
        'A nossa casa de pedra, recuperada com respeito pela traça original. Dois quartos — um de casal e um triplo (casal + solteiro) —, sala de estar, cozinha equipada e WC. No exterior, piscina e churrasqueira. Aberta todo o ano.',
      capacity: '2 quartos · até 5 hóspedes',
      tags: ['2 quartos', 'Piscina exterior', 'Churrasqueira', 'Cozinha equipada', 'Estacionamento'].map(
        (label) => ({ label }),
      ),
    },
    {
      name: 'A segunda casa',
      comingSoon: true,
      order: 2,
      image: 'img:casa-dos-zefas-piscina.jpg',
      gallery: [] as string[],
      cardLabel: 'Em preparação',
      summary:
        'Estamos a preparar uma segunda casa no mesmo recanto da serra, para receber mais hóspedes em breve.',
      cardCapacity: 'Brevemente disponível',
      kicker: 'Em preparação',
      description:
        'Uma segunda casa a nascer no mesmo recanto da serra, com o mesmo cuidado e a mesma vista. Brevemente disponível para reserva.',
      capacity: 'Em breve',
      tags: ['Em preparação', 'Mesma serra', 'Brevemente'].map((label) => ({ label })),
    },
    {
      name: 'A terceira casa',
      comingSoon: true,
      order: 3,
      image: 'img:casa-dos-zefas-sala-estar.jpg',
      gallery: [] as string[],
      cardLabel: 'Em preparação',
      summary: 'E ainda uma terceira, a caminho, para que a Villa Zefas cresça sem perder a alma.',
      cardCapacity: 'Brevemente disponível',
      kicker: 'Em preparação',
      description:
        'E ainda uma terceira, a caminho, para que a Villa Zefas cresça sem perder a alma de casa de família.',
      capacity: 'Em breve',
      tags: ['Em projeto', 'Mais espaço', 'Brevemente'].map((label) => ({ label })),
    },
  ],
}
