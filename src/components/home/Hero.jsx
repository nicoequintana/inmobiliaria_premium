import { Link } from 'react-router-dom';

import { HERO_IMAGE } from '../../data/listings.js';
import { formatPrice } from '../../lib/filters.js';
import Icon from '../ui/Icon.jsx';

// Home hero: full-bleed photo, editorial serif title with a gold keyword, two
// CTAs and a glass property card. The header floats transparently on top.
function Hero({ listing }) {
  return (
    <section className="hero" aria-labelledby="hero-titulo">
      <div className="hero__bg" aria-hidden="true">
        <img
          className="hero__bg-image"
          src={HERO_IMAGE}
          alt=""
          width="1920"
          height="1280"
          fetchpriority="high"
          decoding="async"
        />
      </div>
      <div className="hero__scrim" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="eyebrow">Inmobiliaria · CABA y zona norte</p>
          <h1 className="hero__title" id="hero-titulo">
            <span className="hero__line">Encontrá tu</span>
            <span className="hero__line hero__line--accent">lugar</span>
            <span className="hero__line">para vivir.</span>
          </h1>
          <p className="hero__lede">
            Propiedades en dólares con filtros por zona, tipo y precio. Un catálogo de demostración para
            recorrer el flujo completo, con datos ficticios.
          </p>

          <div className="hero__actions">
            <Link className="btn btn--primary btn--lg" to="/propiedades">
              Explorar propiedades
              <span className="circle-arrow" aria-hidden="true">
                <Icon name="arrow-right" size={16} />
              </span>
            </Link>
            <a className="btn btn--ghost btn--lg hero__play" href="#beneficios">
              <span className="circle-arrow circle-arrow--ghost" aria-hidden="true">
                <Icon name="play" size={14} />
              </span>
              Cómo funciona
            </a>
          </div>
        </div>

        {listing ? (
          <aside className="hero-card" aria-label="Propiedad destacada">
            <p className="eyebrow">Propiedad exclusiva</p>
            <p className="hero-card__name">{listing.title}</p>
            <p className="hero-card__zone">
              <Icon name="map-pin" size={15} strokeWidth={1.7} />
              {listing.zone}
            </p>

            <ul className="hero-card__stats">
              <li>
                <Icon name="bed" size={17} />
                {listing.rooms} amb.
              </li>
              <li>
                <Icon name="bath" size={17} />
                {listing.bathrooms} baños
              </li>
              <li>
                <Icon name="ruler" size={17} />
                {listing.surfaceM2} m²
              </li>
            </ul>

            <div className="hero-card__foot">
              <p className="hero-card__price">{formatPrice(listing)}</p>
              <Link className="hero-card__link" to={`/propiedades/${listing.id}`}>
                Ver propiedad
                <span className="circle-arrow" aria-hidden="true">
                  <Icon name="arrow-right" size={16} />
                </span>
              </Link>
            </div>
          </aside>
        ) : null}
      </div>
    </section>
  );
}

export default Hero;
