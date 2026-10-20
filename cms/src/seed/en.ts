// Initial EN content — mirrors pt.ts shape.
import pt from './pt'

export default {
  site: {
    ...pt.site,
    tagline: 'COUNTRY HOUSE · GERÊS',
    nav: {
      home: 'Home',
      stay: 'Stay',
      house: 'The House',
      geres: 'Gerês',
      gallery: 'Gallery',
      contact: 'Contact',
    },
    bookLabel: 'Book',
    whatsappMessage: "Hello Villa Zefas! I'd like to check availability for Casa dos Zefas.",
    amenities: [
      'Jacuzzi',
      'Sauna',
      'Bicycles for rent',
      'Outdoor pool',
      'Barbecue',
      'Parking',
      'Free Wi‑Fi',
      'Fitted kitchen',
      'Coffee machine',
      'Dishwasher',
      'Open all year',
    ].map((label) => ({ label })),
    footerIntro:
      'Stone country houses in the heart of the Peneda-Gerês National Park. For those seeking silence, mountains and the comfort of feeling at home.',
    footerNavTitle: 'Navigate',
    footerContactTitle: 'Contact',
    footerFollowTitle: 'Follow',
    copyright: '© 2026 Villa Zefas — Country House, Gerês. All rights reserved.',
  },

  home: {
    hero: {
      ...pt.home.hero,
      eyebrow: 'Country House · Gerês',
      title: 'Where the mountains feel like home.',
      text: 'Country houses in the heart of the Peneda‑Gerês National Park, with a pool and the mountains at your door. Silence, nature and the comfort of feeling at home.',
      primaryCta: 'View the stay',
      secondaryCta: 'Book your stay',
      arrivalLabel: 'Check‑in',
      departureLabel: 'Check‑out',
      selectDateLabel: 'Select date',
      availabilityLabel: 'Availability',
    },
    intro: {
      eyebrow: 'Welcome',
      text: 'Waking to the mountains at your window, the sound of the stream and the scent of wood on the fire. Villa Zefas is a stone retreat where time slows down — made for resting, walking and coming back to yourself.',
      signature: '— The Zefas family',
    },
    units: {
      eyebrow: 'The Stay',
      title: 'One house today, three soon.',
      linkLabel: 'View the stay →',
      soonBadge: 'Soon',
    },
    amenities: { eyebrow: 'Amenities', title: 'Everything you need, already included.' },
    news: {
      eyebrow: 'Coming soon to the house',
      title: 'Jacuzzi, sauna and bicycles.',
      text: 'We are adding three new features made for resting after a day in the mountains — and for exploring Gerês on two wheels.',
      badge: 'New',
      items: [
        { title: 'Jacuzzi', text: 'Warm water in the open air, facing the mountains. To end the day slowly.' },
        { title: 'Sauna', text: 'Dry heat to relax your muscles after the trails.' },
        { title: 'Bicycles for rent', text: 'Bikes available at the house, to head out exploring without the car.' },
      ],
    },
    geres: {
      ...pt.home.geres,
      eyebrow: 'The Surroundings',
      title: 'Gerês begins at your door.',
      text: 'Trails through oak woods, crystal‑clear waterfalls, viewpoints over the reservoir and stone villages frozen in time. All just minutes from the house.',
      stats: [
        { value: '+30', label: 'Trails' },
        { value: '5 min', label: 'To the river' },
        { value: '100%', label: 'Nature' },
      ],
      linkLabel: 'Discover Gerês →',
    },
    gallery: { ...pt.home.gallery, eyebrow: 'Gallery', title: 'Moments at the house.', linkLabel: 'View full gallery →' },
    reviews: {
      eyebrow: 'Guests',
      title: 'From those who stayed.',
      items: [
        {
          quote: 'A little corner of peace. Waking to the mountains at the window is priceless — we will definitely be back.',
          name: 'Marta & João',
          where: 'Porto',
        },
        {
          quote: 'The house is beautiful, warm and full of thoughtful details. Five‑star hosts.',
          name: 'Sophie L.',
          where: 'France',
        },
        {
          quote: 'Perfect for switching off. Amazing trails at the door and the fireplace at the end of the day.',
          name: 'Ricardo M.',
          where: 'Lisbon',
        },
      ],
    },
    cta: {
      eyebrow: 'Direct Booking',
      title: 'Ready to stay with us?',
      text: 'Book directly, with no middlemen. Send us your dates and we take care of the rest.',
      buttonLabel: 'Request a booking',
    },
    meta: {
      title: 'Villa Zefas — Country House in Gerês',
      description:
        'Stone country houses in the heart of the Peneda-Gerês National Park, with a pool and the mountains at your door.',
    },
  },

  stay: {
    hero: {
      ...pt.stay.hero,
      eyebrow: 'The Stay',
      title: 'Our houses.',
      text: 'Today, Casa dos Zefas — a 2‑bedroom villa with a pool. Soon, three retreats in the same corner of Gerês.',
    },
    intro: 'One house leading the way, three on the way. Meet Casa dos Zefas.',
    labels: {
      soonBadge: 'Soon',
      viewPhotos: 'View photos',
      photos: 'photos',
      soonNote: 'Available soon',
      book: 'Book',
    },
    amenities: { eyebrow: 'In every house', title: 'Included amenities.' },
    cta: {
      title: 'Still unsure which to choose?',
      text: 'Tell us how many you are and your dates — we will help find the right house for you.',
      buttonLabel: 'Get in touch',
    },
    meta: { title: 'Stay — Villa Zefas', description: 'Casa dos Zefas: a 2-bedroom stone villa with a pool in Gerês.' },
  },

  house: {
    hero: { ...pt.house.hero, eyebrow: 'The House', title: 'A story of stone and mountains.' },
    story: {
      ...pt.house.story,
      eyebrow: 'Our story',
      title: 'Restored by hand, lived in with heart.',
      text: 'Villa Zefas was born from the wish to bring a set of the family’s stone houses back to life, at the foot of the Gerês mountains. Stone by stone, beam by beam, we restored their original character without taking away their soul.\n\nToday, we open our doors to those seeking what we seek: mountain silence, the warmth of a fireplace and time to do nothing at all.',
    },
    values: {
      eyebrow: 'What drives us',
      title: 'Three simple promises.',
      items: [
        {
          numeral: 'I',
          title: 'Authenticity',
          text: 'Exposed stone, wood and natural materials. We kept the soul of each house — we only added comfort.',
        },
        {
          numeral: 'II',
          title: 'Stillness',
          text: 'No noise, no rush. Just the mountains, the stream and time passing more slowly.',
        },
        {
          numeral: 'III',
          title: 'Closeness',
          text: 'Direct booking and hosts who are there for you. We handle everything so all you have to do is rest.',
        },
      ],
    },
    quote: {
      text: '"We didn’t build accommodation. We cared for a home, so you feel in it as you would in your own."',
      author: 'The Zefas family',
    },
    meta: { title: 'The House — Villa Zefas', description: 'The story of Villa Zefas, family stone houses in Gerês.' },
  },

  geres: {
    hero: {
      ...pt.geres.hero,
      eyebrow: 'The Surroundings',
      title: 'Gerês awaits you.',
      text: 'Portugal’s only National Park — mountains, waterfalls, lagoons and stone villages. All just minutes from the house.',
    },
    activities: {
      eyebrow: 'To do',
      title: 'Days worth the journey.',
      items: [
        {
          tag: 'On foot',
          title: 'Trails & Viewpoints',
          text: 'Dozens of walking routes through oak woods and granite, with breathtaking viewpoints over the valleys.',
        },
        {
          tag: 'Water',
          title: 'Waterfalls & Pools',
          text: 'Waterfalls and crystal‑clear pools hidden in the woods — perfect for a summer swim.',
        },
        {
          tag: 'Lake',
          title: 'Caniçada Reservoir',
          text: 'Paddleboarding, kayaking or simply a picnic by the water, with the mountains mirrored in the reservoir.',
        },
        {
          tag: 'Culture',
          title: 'Stone Villages',
          text: 'Villages frozen in time, granaries, chapels and the age‑old rhythm of the mountain people.',
        },
        {
          tag: 'Nature',
          title: 'Albergaria Forest',
          text: 'One of the best‑preserved forests in Europe, part of the ancient Roman Geira road.',
        },
        {
          tag: 'At the table',
          title: 'Food & Drink',
          text: 'Roast kid, corn bread, honey and vinho verde in the region’s taverns and restaurants.',
        },
      ].map((a, i) => ({ ...pt.geres.activities.items[i], ...a })),
    },
    distances: {
      eyebrow: 'Close to everything',
      title: 'Just a stroll away.',
      items: [
        { time: '5 min', place: 'River and trails' },
        { time: '15 min', place: 'Caniçada Reservoir' },
        { time: '25 min', place: 'Gerês village' },
        { time: '50 min', place: 'Braga' },
        { time: '1h30', place: 'Porto' },
      ],
    },
    cta: { title: 'The mountains are better with a home to return to.', buttonLabel: 'Book your stay' },
    meta: { title: 'Gerês — Villa Zefas', description: 'Trails, waterfalls, reservoirs and stone villages minutes from Villa Zefas.' },
  },

  gallery: {
    hero: { ...pt.gallery.hero, eyebrow: 'Gallery', title: 'See inside.' },
    sections: ['The houses', 'Interiors', 'The surroundings'].map((title, i) => ({
      ...pt.gallery.sections[i],
      title,
    })),
    cta: { title: 'These walls are waiting for you.', buttonLabel: 'Book your stay' },
    meta: { title: 'Gallery — Villa Zefas', description: 'Photos of Casa dos Zefas and the Gerês mountains.' },
  },

  contact: {
    hero: { ...pt.contact.hero, eyebrow: 'Contact & Booking', title: 'Come stay with us.' },
    booking: {
      eyebrow: 'Direct Booking',
      title: 'Book with no middlemen.',
      text: 'Check availability for Casa dos Zefas and secure your dates. When you book directly with us, you always get the best price.',
      perks: [{ text: 'Best price guaranteed' }, { text: 'No platform fees' }, { text: 'Direct contact with the hosts' }],
      whatsappLabel: 'Book via WhatsApp',
      arrivalLabel: 'Check‑in',
      departureLabel: 'Check‑out',
      availabilityLabel: 'Check availability',
    },
    details: {
      eyebrow: 'Get in touch',
      title: 'We’re one tap away.',
      phoneLabel: 'Phone',
      emailLabel: 'Email',
      addressLabel: 'Address',
    },
    map: { label: 'Vidoeiro · Caldas do Gerês', linkLabel: 'Open in Google Maps →' },
    meta: { title: 'Contact & Booking — Villa Zefas', description: 'Book Casa dos Zefas in Gerês directly with the hosts.' },
  },

  units: [
    {
      ...pt.units[0],
      cardLabel: 'Available',
      summary: 'Our stone house: two bedrooms, living room, fitted kitchen, outdoor pool and barbecue. Open all year round.',
      cardCapacity: '2‑bed · up to 5 guests',
      kicker: '2‑bed · Stone house · up to 5 guests',
      description:
        'Our stone house, restored with respect for its original character. Two bedrooms — one double and one triple (double + single) —, living room, fitted kitchen and bathroom. Outside, a pool and barbecue. Open all year round.',
      capacity: '2 bedrooms · up to 5 guests',
      tags: ['2 bedrooms', 'Outdoor pool', 'Barbecue', 'Fitted kitchen', 'Parking'].map((label) => ({ label })),
    },
    {
      ...pt.units[1],
      name: 'The second house',
      cardLabel: 'In preparation',
      summary: 'We are preparing a second house in the same corner of the mountains, to welcome more guests soon.',
      cardCapacity: 'Available soon',
      kicker: 'In preparation',
      description:
        'A second house taking shape in the same corner of the mountains, with the same care and the same view. Available to book soon.',
      capacity: 'Soon',
      tags: ['In preparation', 'Same mountains', 'Soon'].map((label) => ({ label })),
    },
    {
      ...pt.units[2],
      name: 'The third house',
      cardLabel: 'In preparation',
      summary: 'And a third on the way, so Villa Zefas can grow without losing its soul.',
      cardCapacity: 'Available soon',
      kicker: 'In preparation',
      description: 'And a third on the way, so Villa Zefas can grow without losing its family‑home soul.',
      capacity: 'Soon',
      tags: ['Planned', 'More space', 'Soon'].map((label) => ({ label })),
    },
  ],
}
