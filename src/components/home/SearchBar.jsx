import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PRICE_MAX, serializeFilters } from '../../lib/filters.js';
import Icon from '../ui/Icon.jsx';

// Landing search: the three filters the brief asks for, in the catalog's own
// query vocabulary, so the results page and the URL stay shareable.
const PRICE_RANGES = [
  { value: '', label: 'Cualquier precio' },
  { value: '150000', label: 'Hasta USD 150.000' },
  { value: '250000', label: 'Hasta USD 250.000' },
  { value: '400000', label: 'Hasta USD 400.000' },
  { value: String(PRICE_MAX), label: 'Hasta USD 600.000' },
];

// Container: owns the draft, then hands the visitor to the catalog with filters.
function SearchBar({ zonaOptions, tipoOptions }) {
  const navigate = useNavigate();
  const [draft, setDraft] = useState({ zona: '', tipo: '', precioMax: '' });

  const update = (key) => (value) => setDraft((current) => ({ ...current, [key]: value }));

  const submit = (event) => {
    event.preventDefault();
    const query = serializeFilters(draft);
    navigate(query ? `/propiedades?${query}` : '/propiedades');
  };

  return (
    <form className="search-bar" onSubmit={submit} aria-label="Buscar propiedades">
      <span className="search-bar__icon" aria-hidden="true">
        <span className="search-bar__icon-circle">
          <Icon name="search" size={20} strokeWidth={1.7} />
        </span>
      </span>

      <div className="search-bar__field">
        <label className="search-bar__label" htmlFor="buscador-zona">
          Ubicación
        </label>
        <select
          id="buscador-zona"
          className="search-bar__select"
          value={draft.zona}
          onChange={(event) => update('zona')(event.target.value)}
        >
          <option value="">Todas las zonas</option>
          {zonaOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="search-bar__field">
        <label className="search-bar__label" htmlFor="buscador-tipo">
          Tipo de propiedad
        </label>
        <select
          id="buscador-tipo"
          className="search-bar__select"
          value={draft.tipo}
          onChange={(event) => update('tipo')(event.target.value)}
        >
          <option value="">Todos los tipos</option>
          {tipoOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="search-bar__field">
        <label className="search-bar__label" htmlFor="buscador-precio">
          Rango de precio
        </label>
        <select
          id="buscador-precio"
          className="search-bar__select"
          value={draft.precioMax}
          onChange={(event) => update('precioMax')(event.target.value)}
        >
          {PRICE_RANGES.map((option) => (
            <option key={option.value || 'all'} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn--primary search-bar__submit">
        Buscar
        <span className="circle-arrow" aria-hidden="true">
          <Icon name="arrow-right" size={16} />
        </span>
      </button>
    </form>
  );
}

export default SearchBar;
