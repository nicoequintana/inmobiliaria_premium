import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  LISTING_IMAGE_HEIGHT,
  LISTING_IMAGE_WIDTH,
  OPERATION_LABELS,
} from '../../data/listings.js';
import { formatPrice } from '../../lib/filters.js';
import Icon from '../ui/Icon.jsx';

// Presentational: a catalog / featured card.
// Always shows photo, status badge, favourite, name, location, room/bath/m2
// stats, a thin divider and the price. The whole card is clickable through a
// stretched link; the favourite button sits above it in the stacking order.
function ListingCard({ listing }) {
  const { id, title, zone, operation, rooms, bathrooms, surfaceM2, images } = listing;
  const [isFavourite, setIsFavourite] = useState(false);

  return (
    <li className="listing-card">
      <div className="listing-card__media">
        <img
          className="listing-card__image"
          src={images[0]}
          alt={`${title} — imagen ilustrativa de demo`}
          width={LISTING_IMAGE_WIDTH}
          height={LISTING_IMAGE_HEIGHT}
          loading="lazy"
          decoding="async"
        />
        <span className={`status-badge status-badge--${operation} listing-card__badge`}>
          {OPERATION_LABELS[operation] ?? 'En venta'}
        </span>
        <button
          type="button"
          className="listing-card__fav"
          aria-pressed={isFavourite}
          aria-label={
            isFavourite ? `Quitar ${title} de favoritos` : `Agregar ${title} a favoritos`
          }
          onClick={() => setIsFavourite((value) => !value)}
        >
          <Icon name="heart" size={18} strokeWidth={1.7} />
        </button>
      </div>

      <div className="listing-card__body">
        <h3 className="listing-card__title">
          <Link className="listing-card__link" to={`/propiedades/${id}`}>
            {title}
          </Link>
        </h3>

        <p className="listing-card__zone">
          <Icon name="map-pin" size={15} strokeWidth={1.7} />
          {zone}
        </p>

        <ul className="listing-card__stats">
          <li>
            <Icon name="bed" size={17} />
            {rooms} amb.
          </li>
          <li>
            <Icon name="bath" size={17} />
            {bathrooms} baños
          </li>
          <li>
            <Icon name="ruler" size={17} />
            {surfaceM2} m²
          </li>
        </ul>

        <div className="listing-card__divider" aria-hidden="true" />

        <p className="listing-card__price">{formatPrice(listing)}</p>
      </div>
    </li>
  );
}

export default ListingCard;
