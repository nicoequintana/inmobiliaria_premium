import { useParams } from 'react-router-dom';

import BackLink from '../components/layout/BackLink.jsx';
import AttributeList from '../components/listings/detail/AttributeList.jsx';
import ContactCTA from '../components/listings/detail/ContactCTA.jsx';
import Gallery from '../components/listings/detail/Gallery.jsx';
import NotFoundBlock from '../components/listings/detail/NotFoundBlock.jsx';
import Icon from '../components/ui/Icon.jsx';
import { OPERATION_LABELS, TIPO_LABELS, getListingById } from '../data/listings.js';
import { formatPrice } from '../lib/filters.js';

// Container: resolves :id against the static catalog and renders the presentational pieces.
function ListingDetailPage() {
  const { id } = useParams();
  const listing = getListingById(id);

  if (!listing) {
    return <NotFoundBlock />;
  }

  return (
    <article className="container detail">
      <BackLink to="/propiedades">Volver al catálogo</BackLink>

      <header className="detail__head">
        <div className="detail__meta">
          <p className="eyebrow">{TIPO_LABELS[listing.tipo] ?? listing.tipo}</p>
          <span className={`status-badge status-badge--${listing.operation}`}>
            {OPERATION_LABELS[listing.operation] ?? 'En venta'}
          </span>
        </div>
        <h1>{listing.title}</h1>
        <p className="detail__zone">
          <span className="detail__zone-icon" aria-hidden="true">
            <Icon name="map-pin" size={16} strokeWidth={1.7} />
          </span>
          {listing.zone}
        </p>
        <p className="detail__price">{formatPrice(listing)}</p>
      </header>

      <Gallery listing={listing} />

      <section className="detail__section" aria-labelledby="ficha-titulo">
        <h2 id="ficha-titulo">Ficha de la propiedad</h2>
        <AttributeList listing={listing} />
      </section>

      <section className="detail__section" aria-labelledby="descripcion-titulo">
        <h2 id="descripcion-titulo">Descripción</h2>
        <p className="detail__description">{listing.description}</p>
      </section>

      <ContactCTA listing={listing} />
    </article>
  );
}

export default ListingDetailPage;
