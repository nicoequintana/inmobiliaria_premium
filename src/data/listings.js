// Hardcoded demo catalog — entirely fictitious data, priced in USD.
// No backend, CMS or fetch layer: the browser receives this module as-is.
// Photography uses Unsplash placeholders (contemporary architecture, warm light)
// with a dark background fallback in CSS so a failed image never looks broken.

const UNSPLASH_BASE = 'https://images.unsplash.com/';

// Every gallery image is 1200x800 (3:2) so layout width/height attributes never cause CLS.
export const LISTING_IMAGE_WIDTH = 1200;
export const LISTING_IMAGE_HEIGHT = 800;

// Build a sized Unsplash URL. `fit=crop` keeps the 3:2 ratio the layout expects.
function photo(id, width = LISTING_IMAGE_WIDTH, height = LISTING_IMAGE_HEIGHT) {
  return `${UNSPLASH_BASE}${id}?auto=format&fit=crop&w=${width}&h=${height}&q=80`;
}

// Verified Unsplash photo ids (contemporary houses, warm/night interiors, offices).
const PHOTO_POOL = [
  'photo-1721815693498-cc28507c0ba2',
  'photo-1580587771525-78b9dba3b914',
  'photo-1531971589569-0d9370cbe1e5',
  'photo-1670589953882-b94c9cb380f5',
  'photo-1628012209120-d9db7abf7eab',
  'photo-1748063578185-3d68121b11ff',
  'photo-1600596542815-ffad4c1539a9',
  'photo-1706808849780-7a04fbac83ef',
  'photo-1613977257363-707ba9348227',
  'photo-1505843513577-22bb7d21e455',
  'photo-1564078516393-cf04bd966897',
  'photo-1630587148265-761cbd139043',
  'photo-1544984243-ec57ea16fe25',
  'photo-1582268611958-ebfd161ef9cf',
  'photo-1613545325278-f24b0cae1224',
  'photo-1682184805271-11671b7ecf4c',
  'photo-1599696848652-f0ff23bc911f',
  'photo-1488972685288-c3fd157d7c7a',
  'photo-1479839672679-a46483c0e7c8',
  'photo-1527576539890-dfa815648363',
  'photo-1487958449943-2429e8be8625',
  'photo-1531591022136-eb8b0da1e6d0',
  'photo-1518005020951-eccb494ad742',
  'photo-1486718448742-163732cd1544',
  'photo-1615406020658-6c4b805f1f30',
  'photo-1531870095880-cac1a675e830',
  'photo-1628745277862-bc0b2d68c50c',
];

// Full-bleed hero photo: modern house with warm interior light.
export const HERO_IMAGE = photo('photo-1613490493576-7fde63acd811', 1920, 1280);

// Three consecutive pool photos per listing, wrapping around the pool.
function gallery(index) {
  return [0, 1, 2].map((step) =>
    photo(PHOTO_POOL[(index * 3 + step) % PHOTO_POOL.length]),
  );
}

export const TIPO_LABELS = {
  departamento: 'Departamento',
  casa: 'Casa',
  ph: 'PH',
  quinta: 'Quinta',
  local: 'Local comercial',
};

// Sale vs. rent. Rentals carry a monthly USD price in `priceUsd`.
export const OPERATION_LABELS = {
  venta: 'En venta',
  alquiler: 'En alquiler',
};

// Raw listing records; images are attached below by index so the pool stays in sync.
const RAW_LISTINGS = [
  {
    id: 'departamento-palermo-soho',
    title: 'Departamento de 3 ambientes en Palermo Soho',
    zone: 'Palermo',
    tipo: 'departamento',
    operation: 'venta',
    priceUsd: 185000,
    rooms: 3,
    bathrooms: 2,
    surfaceM2: 78,
    featured: true,
    description:
      'Departamento con balcón al frente, cocina integrada y muy buena luz natural durante la tarde. Está a metros de plaza Armenia, en una zona con cafés, transporte y comercios.',
  },
  {
    id: 'casa-belgrano-cabildo',
    title: 'Casa de 5 ambientes con jardín en Belgrano',
    zone: 'Belgrano',
    tipo: 'casa',
    operation: 'venta',
    priceUsd: 465000,
    rooms: 5,
    bathrooms: 4,
    surfaceM2: 210,
    featured: true,
    description:
      'Casa con jardín y parrilla sobre una calle arbolada, con cochera para dos autos. Los ambientes son amplios y están distribuidos en dos plantas.',
  },
  {
    id: 'ph-villa-crespo',
    title: 'PH reciclado con patio en Villa Crespo',
    zone: 'Villa Crespo',
    tipo: 'ph',
    operation: 'alquiler',
    priceUsd: 1200,
    rooms: 2,
    bathrooms: 1,
    surfaceM2: 65,
    featured: false,
    description:
      'PH de dos ambientes con patio propio y parrilla, techo alto y pisos de pinotea. Tiene entrada independiente desde la calle.',
  },
  {
    id: 'departamento-recoleta',
    title: 'Departamento de esquina en Recoleta',
    zone: 'Recoleta',
    tipo: 'departamento',
    operation: 'venta',
    priceUsd: 230000,
    rooms: 3,
    bathrooms: 2,
    surfaceM2: 95,
    featured: true,
    description:
      'Departamento en edificio de categoría, con dependencia de servicio y balcón corrido. Se ubica a pasos de avenida Callao, con varias líneas de colectivo cerca.',
  },
  {
    id: 'quinta-nordelta',
    title: 'Quinta con pileta y quincho en Nordelta',
    zone: 'Tigre',
    tipo: 'quinta',
    operation: 'venta',
    priceUsd: 385000,
    rooms: 4,
    bathrooms: 3,
    surfaceM2: 320,
    featured: true,
    description:
      'Quinta con pileta, quincho y jardín de grandes dimensiones. El barrio cuenta con seguridad durante las 24 horas y acceso rápido a la ruta.',
  },
  {
    id: 'local-caballito',
    title: 'Local comercial sobre avenida en Caballito',
    zone: 'Caballito',
    tipo: 'local',
    operation: 'alquiler',
    priceUsd: 2400,
    rooms: 1,
    bathrooms: 1,
    surfaceM2: 110,
    featured: false,
    description:
      'Local a la calle con vidriera amplia y baño, apto para comercio o servicio. La cuadra tiene muy buen flujo peatonal y paradas de transporte a metros.',
  },
  {
    id: 'departamento-san-telmo',
    title: 'Loft de un ambiente en San Telmo',
    zone: 'San Telmo',
    tipo: 'departamento',
    operation: 'alquiler',
    priceUsd: 950,
    rooms: 1,
    bathrooms: 1,
    surfaceM2: 52,
    featured: true,
    description:
      'Loft en edificio reciclado, con techos altos y ventanales amplios que dan mucha luz. La zona tiene galerías de arte, ferias y bares.',
  },
  {
    id: 'casa-san-isidro',
    title: 'Casa moderna con pileta en San Isidro',
    zone: 'San Isidro',
    tipo: 'casa',
    operation: 'venta',
    priceUsd: 540000,
    rooms: 5,
    bathrooms: 4,
    surfaceM2: 265,
    featured: true,
    description:
      'Casa de cinco ambientes con jardín, pileta y galería semicubierta. Incluye cochera cubierta y terminaciones de buena calidad.',
  },
  {
    id: 'departamento-palermo-botanico',
    title: 'Dos ambientes frente al Botánico',
    zone: 'Palermo',
    tipo: 'departamento',
    operation: 'venta',
    priceUsd: 128000,
    rooms: 2,
    bathrooms: 1,
    surfaceM2: 55,
    featured: true,
    description:
      'Departamento luminoso con balcón y cocina separada, frente al Jardín Botánico. Está en muy buen estado general y con expensas moderadas.',
  },
  {
    id: 'ph-belgrano-rivadavia',
    title: 'PH de planta baja en Belgrano',
    zone: 'Belgrano',
    tipo: 'ph',
    operation: 'alquiler',
    priceUsd: 1500,
    rooms: 3,
    bathrooms: 2,
    surfaceM2: 88,
    featured: false,
    description:
      'PH de planta baja con patio y entrada independiente, en una zona residencial y tranquila. Los ambientes son amplios y la ventilación es cruzada.',
  },
  {
    id: 'departamento-vicente-lopez',
    title: 'Departamento con balcón aterrazado en Vicente López',
    zone: 'Vicente López',
    tipo: 'departamento',
    operation: 'venta',
    priceUsd: 210000,
    rooms: 3,
    bathrooms: 2,
    surfaceM2: 90,
    featured: false,
    description:
      'Departamento con balcón aterrazado y vista abierta hacia el río. El edificio tiene amenities y cochera opcional.',
  },
  {
    id: 'casa-villa-crespo-patio',
    title: 'Casa con patio y terraza en Villa Crespo',
    zone: 'Villa Crespo',
    tipo: 'casa',
    operation: 'venta',
    priceUsd: 310000,
    rooms: 4,
    bathrooms: 3,
    surfaceM2: 160,
    featured: false,
    description:
      'Casa con patio y terraza, pensada para quien busca espacio exterior sin salir de la ciudad. La planta baja es flexible y arriba hay dos dormitorios.',
  },
  {
    id: 'local-recoleta',
    title: 'Local a la calle en Recoleta',
    zone: 'Recoleta',
    tipo: 'local',
    operation: 'alquiler',
    priceUsd: 2600,
    rooms: 1,
    bathrooms: 1,
    surfaceM2: 95,
    featured: false,
    description:
      'Local en planta baja con gran vidriera sobre calle comercial, baño y office. Tiene excelente exposición para marcas y servicios.',
  },
  {
    id: 'departamento-caballito',
    title: 'Departamento reciclado en Caballito',
    zone: 'Caballito',
    tipo: 'departamento',
    operation: 'alquiler',
    priceUsd: 1100,
    rooms: 2,
    bathrooms: 1,
    surfaceM2: 60,
    featured: false,
    description:
      'Departamento reciclado con balcón y cocina integrada. La zona es tranquila y está a metros del parque Rivadavia.',
  },
  {
    id: 'quinta-tigre-ribera',
    title: 'Quinta a la ribera en Tigre',
    zone: 'Tigre',
    tipo: 'quinta',
    operation: 'venta',
    priceUsd: 450000,
    rooms: 5,
    bathrooms: 3,
    surfaceM2: 380,
    featured: true,
    description:
      'Quinta sobre la ribera, con muelle propio, jardín y pileta. Está pensada para uso recreativo durante todo el año.',
  },
];

export const LISTINGS = RAW_LISTINGS.map((listing, index) => ({
  ...listing,
  images: gallery(index),
}));

// Landing carousel source: a hand-picked subset marked as featured above.
export const FEATURED_LISTINGS = LISTINGS.filter((listing) => listing.featured);

export const ZONES = [...new Set(LISTINGS.map((listing) => listing.zone))].sort((a, b) =>
  a.localeCompare(b, 'es'),
);

export const TIPOS = [...new Set(LISTINGS.map((listing) => listing.tipo))];

export function getListingById(id) {
  return LISTINGS.find((listing) => listing.id === id) ?? null;
}

const IMAGE_VIEWS = ['vista principal', 'segundo ambiente', 'detalle exterior'];

// Images are Unsplash placeholders, so the alt text says exactly that.
export function listingImageAlt(listing, index) {
  const view = IMAGE_VIEWS[index] ?? `vista ${index + 1}`;
  return `${listing.title} — ${view} (imagen ilustrativa de demo)`;
}
