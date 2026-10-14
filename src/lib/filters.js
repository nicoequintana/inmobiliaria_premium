// Pure filter layer: parse / serialize URL query state and apply AND-semantics
// filtering over the static catalog. No React, no DOM, no network.

// Price slider bounds. precioMax >= PRICE_MAX means "no limit" and is omitted
// from the URL (design: defaults are omitted from the query string).
export const PRICE_MIN = 100000;
export const PRICE_MAX = 600000;
export const PRICE_STEP = 10000;

export const FILTER_KEYS = ['q', 'tipo', 'zona', 'precioMax', 'ambientes'];

// Lowercase + strip accents so "córdoba" matches "cordoba".
function normalize(value) {
  return value
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Read filter values out of a search string ("?q=&tipo=casa&precioMax=200000",
 * with the leading "?" optional). Empty values are dropped.
 */
export function parseFilters(search = '') {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
  const filters = {};

  for (const key of FILTER_KEYS) {
    const raw = (params.get(key) ?? '').trim();
    if (raw) filters[key] = raw;
  }

  return filters;
}

/**
 * Build a query string ("tipo=casa&zona=Palermo") from a filter object.
 * Defaults (empty values and an unlimited max price) are omitted so a link
 * only carries what the visitor actually changed.
 */
export function serializeFilters(filters = {}) {
  const params = new URLSearchParams();

  for (const key of FILTER_KEYS) {
    const raw = (filters[key] ?? '').toString().trim();
    if (!raw) continue;
    if (key === 'precioMax' && Number(raw) >= PRICE_MAX) continue;
    params.set(key, raw);
  }

  return params.toString();
}

/**
 * Apply every active filter (AND semantics) over the catalog.
 * - q:          text search over title, zone and description
 * - tipo:       exact property type
 * - zona:       exact zone (query param "zona" maps to the listing's "zone" field)
 * - precioMax:  listing price at or below the maximum
 * - ambientes:  minimum room count ("N o más")
 */
export function filterListings(listings, filters = {}) {
  const { q, tipo, zona, precioMax, ambientes } = filters;
  const query = q ? normalize(q) : '';
  const maxPrice = precioMax ? Number(precioMax) : null;
  const minRooms = ambientes ? Number(ambientes) : null;

  return listings.filter((listing) => {
    if (query) {
      const haystack = normalize(`${listing.title} ${listing.zone} ${listing.description}`);
      if (!haystack.includes(query)) return false;
    }

    if (tipo && listing.tipo !== tipo) return false;
    if (zona && listing.zone !== zona) return false;
    if (maxPrice !== null && listing.priceUsd > maxPrice) return false;
    if (minRooms !== null && listing.rooms < minRooms) return false;

    return true;
  });
}

export function hasActiveFilters(filters = {}) {
  return FILTER_KEYS.some((key) => Boolean((filters[key] ?? '').toString().trim()));
}

const usdFormatter = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 });

/** "185000" -> "USD 185.000" */
export function formatUSD(priceUsd) {
  return `USD ${usdFormatter.format(priceUsd)}`;
}

/**
 * Price label for a listing. Rentals advertise a monthly USD price, so the
 * suffix makes the unit explicit instead of implying a sale figure.
 */
export function formatPrice(listing) {
  const base = formatUSD(listing.priceUsd);
  return listing.operation === 'alquiler' ? `${base} / mes` : base;
}
