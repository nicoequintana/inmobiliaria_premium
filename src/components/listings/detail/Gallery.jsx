import { useState } from 'react';

import { LISTING_IMAGE_HEIGHT, LISTING_IMAGE_WIDTH, listingImageAlt } from '../../../data/listings.js';
import Icon from '../../ui/Icon.jsx';

// Presentational: photo gallery with thumbnails, prev/next controls and arrow-key
// navigation. The first image is eager (it is the hero of the page), the rest lazy.
function Gallery({ listing }) {
  const [active, setActive] = useState(0);
  const images = listing.images;
  const total = images.length;

  const goTo = (index) => setActive(((index % total) + total) % total);

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(active - 1);
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(active + 1);
    }
  };

  return (
    <section className="gallery" aria-label={`Galería de ${listing.title}`} onKeyDown={handleKeyDown}>
      <figure className="gallery__stage">
        <img
          className="gallery__image"
          src={images[active]}
          alt={listingImageAlt(listing, active)}
          width={LISTING_IMAGE_WIDTH}
          height={LISTING_IMAGE_HEIGHT}
          loading={active === 0 ? 'eager' : 'lazy'}
          decoding="async"
        />
        <figcaption className="gallery__counter" aria-live="polite">
          {active + 1} / {total}
        </figcaption>
      </figure>

      <div className="gallery__thumbs" role="group" aria-label="Elegir imagen de la galería">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            className="gallery__thumb"
            aria-pressed={index === active}
            aria-label={`Ver imagen ${index + 1} de ${total}`}
            onClick={() => goTo(index)}
          >
            <img
              className="gallery__thumb-image"
              src={src}
              alt=""
              width={LISTING_IMAGE_WIDTH}
              height={LISTING_IMAGE_HEIGHT}
              loading="lazy"
              decoding="async"
            />
          </button>
        ))}
      </div>

      <div className="gallery__nav">
        <button
          type="button"
          className="gallery__nav-btn"
          onClick={() => goTo(active - 1)}
          aria-label="Ver imagen anterior"
        >
          <Icon name="arrow-left" size={18} />
        </button>
        <button
          type="button"
          className="gallery__nav-btn"
          onClick={() => goTo(active + 1)}
          aria-label="Ver imagen siguiente"
        >
          <Icon name="arrow-right" size={18} />
        </button>
      </div>
    </section>
  );
}

export default Gallery;
