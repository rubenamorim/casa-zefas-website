// Initial ES content — mirrors pt.ts shape.
import pt from './pt'

export default {
  site: {
    ...pt.site,
    nav: {
      home: 'Inicio',
      stay: 'Alojamiento',
      house: 'La Casa',
      geres: 'El Gerês',
      gallery: 'Galería',
      contact: 'Contacto',
    },
    bookLabel: 'Reservar',
    whatsappMessage: '¡Hola Villa Zefas! Me gustaría conocer la disponibilidad de la Casa dos Zefas.',
    amenities: [
      'Jacuzzi',
      'Sauna',
      'Bicicletas de alquiler',
      'Piscina exterior',
      'Barbacoa',
      'Aparcamiento',
      'Wi‑Fi gratis',
      'Cocina equipada',
      'Cafetera',
      'Lavavajillas',
      'Abierto todo el año',
    ].map((label) => ({ label })),
    footerIntro:
      'Casas de campo en piedra, en el corazón del Parque Nacional de Peneda-Gerês. Para quien busca silencio, montaña y la comodidad de sentirse como en casa.',
    footerNavTitle: 'Navegar',
    footerContactTitle: 'Contacto',
    footerFollowTitle: 'Seguir',
    copyright: '© 2026 Villa Zefas — Casa de Campo, Gerês. Todos los derechos reservados.',
  },

  home: {
    hero: {
      ...pt.home.hero,
      eyebrow: 'Casa de Campo · Gerês',
      title: 'Donde la montaña se hace hogar.',
      text: 'Casas de campo en el corazón del Parque Nacional de Peneda‑Gerês, con piscina y la montaña a la puerta. Silencio, naturaleza y la comodidad de sentirse como en casa.',
      primaryCta: 'Ver el alojamiento',
      secondaryCta: 'Reservar estancia',
      arrivalLabel: 'Entrada',
      departureLabel: 'Salida',
      selectDateLabel: 'Seleccionar fecha',
      availabilityLabel: 'Disponibilidad',
    },
    intro: {
      eyebrow: 'Bienvenido',
      text: 'Despertar con la montaña en la ventana, el sonido del arroyo y el aroma de leña en la chimenea. Villa Zefas es un refugio de piedra donde el tiempo se ralentiza — hecho para descansar, caminar y reencontrarse.',
      signature: '— La familia Zefas',
    },
    units: {
      eyebrow: 'El Alojamiento',
      title: 'Una casa hoy, tres muy pronto.',
      linkLabel: 'Ver alojamiento →',
      soonBadge: 'Pronto',
    },
    amenities: { eyebrow: 'Comodidades', title: 'Todo lo que necesita, ya incluido.' },
    news: {
      eyebrow: 'Pronto en la casa',
      title: 'Jacuzzi, sauna y bicicletas.',
      text: 'Estamos añadiendo tres novedades pensadas para el descanso tras un día de montaña — y para explorar el Gerês sobre dos ruedas.',
      badge: 'Novedad',
      items: [
        { title: 'Jacuzzi', text: 'Agua caliente al aire libre, frente a la montaña. Para acabar el día despacio.' },
        { title: 'Sauna', text: 'Calor seco para relajar los músculos después de los senderos.' },
        {
          title: 'Bicicletas de alquiler',
          text: 'Bicicletas disponibles en la casa, para salir a descubrir sin depender del coche.',
        },
      ],
    },
    geres: {
      ...pt.home.geres,
      eyebrow: 'El Entorno',
      title: 'El Gerês empieza en su puerta.',
      text: 'Senderos entre robles, cascadas de agua cristalina, miradores sobre el embalse y aldeas de piedra detenidas en el tiempo. Todo a pocos minutos de la casa.',
      stats: [
        { value: '+30', label: 'Senderos' },
        { value: '5 min', label: 'Hasta el río' },
        { value: '100%', label: 'Naturaleza' },
      ],
      linkLabel: 'Descubrir el Gerês →',
    },
    gallery: { ...pt.home.gallery, eyebrow: 'Galería', title: 'Momentos en la casa.', linkLabel: 'Ver galería completa →' },
    reviews: {
      eyebrow: 'Huéspedes',
      title: 'Quienes se alojaron, lo cuentan.',
      items: [
        {
          quote: 'Un rincón de paz. Despertar con la montaña en la ventana no tiene precio — volveremos seguro.',
          name: 'Marta & João',
          where: 'Porto',
        },
        {
          quote: 'La casa es preciosa, cálida y llena de detalles. Anfitriones de cinco estrellas.',
          name: 'Sophie L.',
          where: 'Francia',
        },
        {
          quote: 'Perfecta para desconectar. Senderos increíbles a la puerta y la chimenea al final del día.',
          name: 'Ricardo M.',
          where: 'Lisboa',
        },
      ],
    },
    cta: {
      eyebrow: 'Reservas Directas',
      title: '¿Listo para alojarse con nosotros?',
      text: 'Reserve directamente y sin intermediarios. Escríbanos con sus fechas y nos encargamos de todo.',
      buttonLabel: 'Solicitar reserva',
    },
    meta: {
      title: 'Villa Zefas — Casa de Campo en el Gerês',
      description:
        'Casas de campo en piedra en el corazón del Parque Nacional de Peneda-Gerês, con piscina y la montaña a la puerta.',
    },
  },

  stay: {
    hero: {
      ...pt.stay.hero,
      eyebrow: 'El Alojamiento',
      title: 'Nuestras casas.',
      text: 'Hoy, la Casa dos Zefas — una villa de 2 habitaciones con piscina. Pronto, tres refugios en el mismo rincón del Gerês.',
    },
    intro: 'Una casa abriendo camino, tres por llegar. Conozca la Casa dos Zefas.',
    labels: {
      soonBadge: 'Pronto',
      viewPhotos: 'Ver fotos',
      photos: 'fotos',
      soonNote: 'Disponible muy pronto',
      book: 'Reservar',
    },
    amenities: { eyebrow: 'En todas las casas', title: 'Comodidades incluidas.' },
    cta: {
      title: '¿Aún con dudas sobre cuál elegir?',
      text: 'Díganos cuántos son y las fechas — le ayudamos a encontrar la casa ideal para usted.',
      buttonLabel: 'Hablar con nosotros',
    },
    meta: {
      title: 'Alojamiento — Villa Zefas',
      description: 'Casa dos Zefas: villa de piedra de 2 habitaciones con piscina en el Gerês.',
    },
  },

  house: {
    hero: { ...pt.house.hero, eyebrow: 'La Casa', title: 'Una historia de piedra y montaña.' },
    story: {
      ...pt.house.story,
      eyebrow: 'Nuestra historia',
      title: 'Restaurada con las manos, habitada con el corazón.',
      text: 'Villa Zefas nació del deseo de devolver la vida a un conjunto de casas de piedra de la familia, al pie de la sierra del Gerês. Piedra a piedra, madera a madera, restauramos su carácter original sin robarle el alma.\n\nHoy, abrimos las puertas a quienes buscan lo mismo que nosotros: el silencio de la montaña, el calor de una chimenea y el tiempo para no hacer nada.',
    },
    values: {
      eyebrow: 'Lo que nos mueve',
      title: 'Tres promesas sencillas.',
      items: [
        {
          numeral: 'I',
          title: 'Autenticidad',
          text: 'Piedra vista, madera y materiales naturales. Mantuvimos el alma de cada casa — solo le añadimos comodidad.',
        },
        {
          numeral: 'II',
          title: 'Sosiego',
          text: 'Sin ruido, sin prisa. Solo la montaña, el arroyo y el tiempo pasando más despacio.',
        },
        {
          numeral: 'III',
          title: 'Cercanía',
          text: 'Reservas directas y anfitriones presentes. Nos ocupamos de todo para que solo tenga que descansar.',
        },
      ],
    },
    quote: {
      text: '"No construimos un alojamiento. Cuidamos una casa, para que se sienta en ella como en la suya."',
      author: 'La familia Zefas',
    },
    meta: { title: 'La Casa — Villa Zefas', description: 'La historia de Villa Zefas, casas de piedra familiares en el Gerês.' },
  },

  geres: {
    hero: {
      ...pt.geres.hero,
      eyebrow: 'El Entorno',
      title: 'El Gerês le espera.',
      text: 'El único Parque Nacional de Portugal — montañas, cascadas, lagunas y aldeas de piedra. Todo a pocos minutos de la casa.',
    },
    activities: {
      eyebrow: 'Para hacer',
      title: 'Días que valen el viaje.',
      items: [
        {
          tag: 'A pie',
          title: 'Senderos y Miradores',
          text: 'Decenas de rutas a pie entre robledales y granito, con miradores que quitan el aliento sobre los valles.',
        },
        {
          tag: 'Agua',
          title: 'Cascadas y Pozas',
          text: 'Saltos de agua y pozas de agua cristalina escondidos en el bosque — perfectos para un baño en verano.',
        },
        {
          tag: 'Lago',
          title: 'Embalse de Caniçada',
          text: 'Paddle, kayak o simplemente un picnic a la orilla del agua, con la montaña reflejada en el embalse.',
        },
        {
          tag: 'Cultura',
          title: 'Aldeas de Piedra',
          text: 'Aldeas detenidas en el tiempo, hórreos, capillas y el antiguo ritmo de las gentes de la montaña.',
        },
        {
          tag: 'Naturaleza',
          title: 'Bosque de Albergaria',
          text: 'Uno de los bosques mejor conservados de Europa, parte de la antigua Geira romana.',
        },
        {
          tag: 'A la mesa',
          title: 'Gastronomía',
          text: 'Cabrito asado, pan de maíz, miel y vino verde en las tabernas y restaurantes de la región.',
        },
      ].map((a, i) => ({ ...pt.geres.activities.items[i], ...a })),
    },
    distances: {
      eyebrow: 'Cerca de todo',
      title: 'A un paseo de distancia.',
      items: [
        { time: '5 min', place: 'Río y senderos' },
        { time: '15 min', place: 'Embalse de Caniçada' },
        { time: '25 min', place: 'Pueblo del Gerês' },
        { time: '50 min', place: 'Braga' },
        { time: '1h30', place: 'Porto' },
      ],
    },
    cta: { title: 'La montaña es mejor con un hogar al que volver.', buttonLabel: 'Reservar su estancia' },
    meta: {
      title: 'El Gerês — Villa Zefas',
      description: 'Senderos, cascadas, embalses y aldeas de piedra a minutos de Villa Zefas.',
    },
  },

  gallery: {
    hero: { ...pt.gallery.hero, eyebrow: 'Galería', title: 'Vea el interior.' },
    sections: ['Las casas', 'Interiores', 'El entorno'].map((title, i) => ({ ...pt.gallery.sections[i], title })),
    cta: { title: 'Estas paredes le esperan.', buttonLabel: 'Reservar estancia' },
    meta: { title: 'Galería — Villa Zefas', description: 'Fotos de la Casa dos Zefas y de la montaña del Gerês.' },
  },

  contact: {
    hero: { ...pt.contact.hero, eyebrow: 'Contacto y Reservas', title: 'Venga a alojarse con nosotros.' },
    booking: {
      eyebrow: 'Reservas Directas',
      title: 'Reserve sin intermediarios.',
      text: 'Consulte la disponibilidad de la Casa dos Zefas y asegure sus fechas. Al reservar directamente con nosotros, siempre tiene el mejor precio.',
      perks: [
        { text: 'Mejor precio garantizado' },
        { text: 'Sin comisiones de plataforma' },
        { text: 'Contacto directo con los anfitriones' },
      ],
      whatsappLabel: 'Reservar por WhatsApp',
      arrivalLabel: 'Entrada',
      departureLabel: 'Salida',
      availabilityLabel: 'Ver disponibilidad',
    },
    details: {
      eyebrow: 'Hablar con nosotros',
      title: 'Estamos a un toque.',
      phoneLabel: 'Teléfono',
      emailLabel: 'Email',
      addressLabel: 'Dirección',
    },
    map: { label: 'Vidoeiro · Caldas do Gerês', linkLabel: 'Abrir en Google Maps →' },
    meta: { title: 'Contacto y Reservas — Villa Zefas', description: 'Reserve directamente la Casa dos Zefas, en el Gerês.' },
  },

  units: [
    {
      ...pt.units[0],
      cardLabel: 'Disponible',
      summary: 'Nuestra casa de piedra: dos habitaciones, salón, cocina equipada, piscina exterior y barbacoa. Abierta todo el año.',
      cardCapacity: '2 hab. · hasta 5 huéspedes',
      kicker: '2 hab. · Casa de piedra · hasta 5 huéspedes',
      description:
        'Nuestra casa de piedra, restaurada con respeto por su carácter original. Dos habitaciones — una doble y una triple (doble + individual) —, salón, cocina equipada y baño. En el exterior, piscina y barbacoa. Abierta todo el año.',
      capacity: '2 habitaciones · hasta 5 huéspedes',
      tags: ['2 habitaciones', 'Piscina exterior', 'Barbacoa', 'Cocina equipada', 'Aparcamiento'].map((label) => ({
        label,
      })),
    },
    {
      ...pt.units[1],
      name: 'La segunda casa',
      cardLabel: 'En preparación',
      summary:
        'Estamos preparando una segunda casa en el mismo rincón de la montaña, para recibir a más huéspedes muy pronto.',
      cardCapacity: 'Disponible muy pronto',
      kicker: 'En preparación',
      description:
        'Una segunda casa naciendo en el mismo rincón de la montaña, con el mismo cuidado y las mismas vistas. Disponible para reservar muy pronto.',
      capacity: 'Pronto',
      tags: ['En preparación', 'Misma montaña', 'Pronto'].map((label) => ({ label })),
    },
    {
      ...pt.units[2],
      name: 'La tercera casa',
      cardLabel: 'En preparación',
      summary: 'Y una tercera en camino, para que Villa Zefas crezca sin perder su alma.',
      cardCapacity: 'Disponible muy pronto',
      kicker: 'En preparación',
      description: 'Y una tercera en camino, para que Villa Zefas crezca sin perder su alma de casa familiar.',
      capacity: 'Pronto',
      tags: ['En proyecto', 'Más espacio', 'Pronto'].map((label) => ({ label })),
    },
  ],
}
