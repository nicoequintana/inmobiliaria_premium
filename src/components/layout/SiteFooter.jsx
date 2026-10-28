import { Link } from 'react-router-dom';

import DemoDisclaimer from './DemoDisclaimer.jsx';

// Footer carries the site-wide demo badge and the USD + fictitious-data
// disclaimer on every page, plus the grouped site navigation.
function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand-col">
          <p className="site-footer__brand">Inmobiliaria Demo</p>
          <p className="site-footer__tagline">Inmobiliaria demo · CABA y zona norte</p>
        </div>

        <nav className="site-footer__nav" aria-label="Navegación del pie de página">
          <Link className="site-footer__link" to="/">
            Inicio
          </Link>
          <Link className="site-footer__link" to="/propiedades">
            Propiedades
          </Link>
          <Link className="site-footer__link" to="/#contacto">
            Contacto
          </Link>
        </nav>

        <div className="site-footer__legal">
          <DemoDisclaimer />
          <p className="site-footer__disclaimer">
            Sitio de demostración. Todos los valores se expresan en dólares estadounidenses (USD). Las
            propiedades, precios, superficies e imágenes son datos ficticios creados para esta demo y no
            constituyen ofertas reales.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
