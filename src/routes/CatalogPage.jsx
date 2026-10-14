import { useEffect, useMemo, useRef } from 'react';
import { stagger } from 'animejs';
import { useLocation, useSearchParams } from 'react-router-dom';

import FilterBar from '../components/filters/FilterBar.jsx';
import BackLink from '../components/layout/BackLink.jsx';
import EmptyState from '../components/listings/EmptyState.jsx';
import ListingGrid from '../components/listings/ListingGrid.jsx';
import ResultCount from '../components/listings/ResultCount.jsx';
import { LISTINGS, TIPO_LABELS, TIPOS, ZONES } from '../data/listings.js';
import { filterListings, parseFilters } from '../lib/filters.js';
import { run } from '../lib/motion.js';

// Choreography: entrance stagger, filter-change count flip and grid settle.
// All of it runs through the motion gate (motion.js) and starts above opacity 0,
// so cards are readable and clickable on the first frame.
const CATALOG_ENTRANCE = {
  y: [14, 0],
  opacity: [0.6, 1],
  duration: 380,
  delay: stagger(45),
  ease: 'out(2)',
};
const COUNT_FLIP = { y: [-6, 0], opacity: [0.5, 1], duration: 180, ease: 'out(2)' };
const GRID_SETTLE = { y: [4, 0], opacity: [0.7, 1], duration: 180, ease: 'out(2)' };

// Container: reads the URL, runs the pure filter layer and feeds presentational children.
function CatalogPage() {
  const location = useLocation();
  const [, setSearchParams] = useSearchParams();

  const filters = useMemo(() => parseFilters(location.search), [location.search]);
  const results = useMemo(() => filterListings(LISTINGS, filters), [filters]);
  const tipoOptions = useMemo(
    () => TIPOS.map((tipo) => ({ value: tipo, label: TIPO_LABELS[tipo] ?? tipo })),
    [],
  );
  const zonaOptions = useMemo(() => ZONES.map((zona) => ({ value: zona, label: zona })), []);

  const isFirstRender = useRef(true);

  useEffect(() => {
    run('.listing-card', CATALOG_ENTRANCE);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    run('.result-count__value', COUNT_FLIP);
    run('.listing-grid', GRID_SETTLE);
  }, [results]);

  const clearAll = () => setSearchParams('');

  return (
    <div className="container catalog">
      <BackLink to="/">Volver al inicio</BackLink>

      <header className="catalog__head">
        <p className="eyebrow">Catálogo demo en USD</p>
        <h1>Propiedades disponibles</h1>
        <p className="catalog__lede">
          {LISTINGS.length} propiedades ficticias para recorrer el flujo completo del sitio. Los filtros quedan
          guardados en la dirección del navegador, así podés compartir el enlace con los resultados ya aplicados.
        </p>
      </header>

      <FilterBar tipoOptions={tipoOptions} zonaOptions={zonaOptions} />

      <ResultCount count={results.length} />

      {results.length > 0 ? <ListingGrid listings={results} /> : <EmptyState onClear={clearAll} />}
    </div>
  );
}

export default CatalogPage;
