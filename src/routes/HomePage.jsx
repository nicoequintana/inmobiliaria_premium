import { Link } from 'react-router-dom';

import Benefits from '../components/home/Benefits.jsx';
import Hero from '../components/home/Hero.jsx';
import SearchBar from '../components/home/SearchBar.jsx';
import { CONTACT, mailtoHref, whatsappHref } from '../components/listings/detail/ContactCTA.jsx';
import FeaturedCarousel from '../components/listings/FeaturedCarousel.jsx';
import Icon from '../components/ui/Icon.jsx';
import { FEATURED_LISTINGS, LISTINGS, TIPO_LABELS, TIPOS, ZONES } from '../data/listings.js';

const heroListing = FEATURED_LISTINGS[0] ?? LISTINGS[0];
const tipoOptions = TIPOS.map((tipo) => ({ value: tipo, label: TIPO_LABELS[tipo] ?? tipo }));
const zonaOptions = ZONES.map((zona) => ({ value: zona, label: zona }));

// Container: the landing. Composes hero, floating search, featured carousel,
// benefits and contact; all sections share the dark luxury system.
function HomePage() {
  const message = 'Hola, quiero consultar por una propiedad del catálogo demo de Garcia Boillos Propiedades.';

  return (
    <div className="home">
      <Hero listing={heroListing} />

      <div className="search-mount">
        <div className="container">
          <SearchBar zonaOptions={zonaOptions} tipoOptions={tipoOptions} />
        </div>
      </div>

      <section className="featured" aria-labelledby="destacadas-titulo">
        <div className="container">
          <header className="section-head">
            <div className="section-head__copy">
              <p className="eyebrow">Propiedades destacadas</p>
              <h2 className="section-title">
                <span className="section-title__line">Propiedades para</span>
                <span className="section-title__line section-title__line--accent">vivir mejor.</span>
              </h2>
            </div>
            <Link className="section-head__link" to="/propiedades">
              Ver todas las propiedades
              <Icon name="arrow-right" size={16} />
            </Link>
          </header>

          <FeaturedCarousel listings={FEATURED_LISTINGS} />
        </div>
      </section>

      <section className="benefits-section" id="beneficios" aria-labelledby="beneficios-titulo">
        <div className="container">
          <header className="section-head section-head--center">
            <div className="section-head__copy">
              <p className="eyebrow">Cómo funciona</p>
              <h2 className="section-title" id="beneficios-titulo">
                <span className="section-title__line">Cuatro razones</span>
                <span className="section-title__line section-title__line--accent">para elegirnos.</span>
              </h2>
            </div>
          </header>

          <Benefits />
        </div>
      </section>

      <section className="contact-band-section" id="contacto" aria-labelledby="contacto-titulo">
        <div className="container">
          <div className="contact-band">
            <div>
              <p className="eyebrow">Contacto</p>
              <h2 id="contacto-titulo">¿Querés coordinar una visita?</h2>
              <p className="contact-band__lede">
                En esta demo el contacto se hace por WhatsApp o por email. No hay formularios, cuentas ni pagos.
              </p>
            </div>
            <div className="contact-band__actions">
              <a
                className="btn btn--primary"
                href={whatsappHref(message)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Escribir por WhatsApp a Garcia Boillos Propiedades"
              >
                Escribir por WhatsApp
              </a>
              <a
                className="btn btn--ghost"
                href={mailtoHref('Consulta desde el sitio demo', message)}
                aria-label={`Enviar un email a ${CONTACT.email}`}
              >
                Enviar un email
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
