import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import Icon from '../ui/Icon.jsx';

function navClass({ isActive }) {
  return isActive ? 'site-header__link is-active' : 'site-header__link';
}

// Fixed, transparent header that floats over the hero and gains a blurred
// night backdrop once the page scrolls. Brand left, links centred, CTA right.
function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={isScrolled ? 'site-header is-scrolled' : 'site-header'}>
      <a className="skip-link" href="#contenido-principal">
        Saltar al contenido principal
      </a>
      <div className="container site-header__inner">
        <Link className="site-header__brand" to="/" aria-label="Inmobiliaria Demo, ir al inicio">
          <span className="site-header__mark" aria-hidden="true">
            ID
          </span>
          <span className="site-header__name">
            Inmobiliaria
            <span className="site-header__tagline">Demo</span>
          </span>
        </Link>

        <nav className="site-header__nav" aria-label="Navegación principal">
          <NavLink to="/" className={navClass} end>
            Inicio
          </NavLink>
          <NavLink to="/propiedades" className={navClass}>
            Propiedades
          </NavLink>
          <Link className="site-header__link" to="/#contacto">
            Contacto
          </Link>
        </nav>

        <div className="site-header__actions">
          <Link
            className="btn btn--primary site-header__cta"
            to="/propiedades"
            aria-label="Ver propiedades"
          >
            <span className="site-header__cta-text">Ver propiedades</span>
            <span className="circle-arrow" aria-hidden="true">
              <Icon name="arrow-right" size={16} />
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
