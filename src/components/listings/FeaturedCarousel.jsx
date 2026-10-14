import { useEffect, useState } from 'react';

import ListingCard from './ListingCard.jsx';
import Icon from '../ui/Icon.jsx';

// How many cards a page holds at the current width. Reuses the SCSS breakpoints
// (640 / 1024) so the grid and the pagination never disagree.
function computePerPage() {
  if (typeof window === 'undefined') return 4;
  if (window.matchMedia('(min-width: 1024px)').matches) return 4;
  if (window.matchMedia('(min-width: 640px)').matches) return 2;
  return 1;
}

// Container: real pagination (no fake pages). Each page renders a slice of the
// featured list, and the dots reflect the true number of pages at this width.
function FeaturedCarousel({ listings, label = 'Propiedades destacadas' }) {
  const [perPage, setPerPage] = useState(computePerPage);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const onResize = () => setPerPage(computePerPage());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // A narrower layout can reduce the page count; clamp instead of showing a gap.
  useEffect(() => {
    setPage(0);
  }, [perPage]);

  const pageCount = Math.max(1, Math.ceil(listings.length / perPage));
  const current = Math.min(page, pageCount - 1);
  const start = current * perPage;
  const visible = listings.slice(start, start + perPage);
  const hasPagination = pageCount > 1;

  return (
    <div className="carousel">
      <ul className="carousel__track" aria-label={label}>
        {visible.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </ul>

      {hasPagination ? (
        <div className="carousel__pagination">
          <button
            type="button"
            className="carousel__arrow carousel__arrow--prev"
            onClick={() => setPage((current - 1 + pageCount) % pageCount)}
            aria-label="Ver propiedades destacadas anteriores"
          >
            <Icon name="chevron-left" size={20} />
          </button>

          <p className="carousel__counter" aria-live="polite">
            {current + 1} / {pageCount}
          </p>

          <div className="carousel__dots">
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                key={index}
                type="button"
                className={index === current ? 'carousel__dot is-active' : 'carousel__dot'}
                onClick={() => setPage(index)}
                aria-label={`Página ${index + 1} de ${pageCount}`}
                aria-current={index === current ? 'true' : undefined}
              >
                <span className="carousel__dot-bar" aria-hidden="true" />
              </button>
            ))}
          </div>

          <button
            type="button"
            className="carousel__arrow carousel__arrow--next"
            onClick={() => setPage((current + 1) % pageCount)}
            aria-label="Ver más propiedades destacadas"
          >
            <Icon name="chevron-right" size={20} />
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default FeaturedCarousel;
