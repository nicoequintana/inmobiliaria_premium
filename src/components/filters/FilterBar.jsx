import { useEffect, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { hasActiveFilters, parseFilters, serializeFilters } from '../../lib/filters.js';
import ClearFilters from './ClearFilters.jsx';
import PriceRangeInput from './PriceRangeInput.jsx';
import SearchInput from './SearchInput.jsx';
import SelectFilter from './SelectFilter.jsx';

// The URL is the source of truth. Inputs stay local while the visitor types and
// one history entry is pushed per committed change (350ms debounce), so the
// browser back button walks through states the visitor actually chose.
const COMMIT_DELAY_MS = 350;

const AMBIENTES_OPTIONS = [
  { value: '1', label: '1 o más' },
  { value: '2', label: '2 o más' },
  { value: '3', label: '3 o más' },
  { value: '4', label: '4 o más' },
  { value: '5', label: '5 o más' },
];

// Container: owns the draft state and writes it to the query string.
function FilterBar({ tipoOptions, zonaOptions }) {
  const location = useLocation();
  const [, setSearchParams] = useSearchParams();
  const [draft, setDraft] = useState(() => parseFilters(location.search));
  // Only matters below the `sm` breakpoint; wider layouts always show the fields.
  const [isOpen, setIsOpen] = useState(() => hasActiveFilters(parseFilters(location.search)));

  const searchRef = useRef(location.search);
  const pushedRef = useRef(location.search);
  const timerRef = useRef(null);

  searchRef.current = location.search;

  // Adopt external URL changes (browser back/forward, clear from the empty state).
  useEffect(() => {
    if (location.search === pushedRef.current) return;
    window.clearTimeout(timerRef.current);
    pushedRef.current = location.search;
    setDraft(parseFilters(location.search));
  }, [location.search]);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const commit = (next) => {
    const query = serializeFilters(next);
    const target = query ? `?${query}` : '';
    pushedRef.current = target;
    if (target !== searchRef.current) setSearchParams(query);
  };

  const scheduleCommit = (next) => {
    setDraft(next);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => commit(next), COMMIT_DELAY_MS);
  };

  const update = (key) => (value) => scheduleCommit({ ...draft, [key]: value });

  const clear = () => {
    window.clearTimeout(timerRef.current);
    setDraft({});
    commit({});
  };

  return (
    <section className="filter-bar" aria-label="Filtros de búsqueda">
      <div className="filter-bar__head">
        <h2 className="filter-bar__title">Filtros</h2>
        {hasActiveFilters(draft) ? <ClearFilters onClear={clear} /> : null}
      </div>

      <button
        type="button"
        className="btn btn--ghost filter-bar__toggle"
        aria-expanded={isOpen}
        aria-controls="filter-bar-fields"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? 'Ocultar filtros' : 'Mostrar filtros'}
      </button>

      <div id="filter-bar-fields" className={isOpen ? 'filter-bar__grid is-open' : 'filter-bar__grid'}>
        <SearchInput value={draft.q ?? ''} onChange={update('q')} />
        <SelectFilter
          id="filtro-tipo"
          label="Tipo de propiedad"
          anyLabel="Todos los tipos"
          value={draft.tipo ?? ''}
          options={tipoOptions}
          onChange={update('tipo')}
        />
        <SelectFilter
          id="filtro-zona"
          label="Zona"
          anyLabel="Todas las zonas"
          value={draft.zona ?? ''}
          options={zonaOptions}
          onChange={update('zona')}
        />
        <SelectFilter
          id="filtro-ambientes"
          label="Ambientes (mínimo)"
          anyLabel="Cualquier cantidad"
          value={draft.ambientes ?? ''}
          options={AMBIENTES_OPTIONS}
          onChange={update('ambientes')}
        />
        <PriceRangeInput value={draft.precioMax ?? ''} onChange={update('precioMax')} />
      </div>
    </section>
  );
}

export default FilterBar;
