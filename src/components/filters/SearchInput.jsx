// Presentational: a labelled text input for the free-text search filter.
function SearchInput({ value, onChange }) {
  return (
    <div className="filter-field">
      <label className="filter-field__label" htmlFor="filtro-busqueda">
        Buscar
      </label>
      <input
        id="filtro-busqueda"
        className="filter-input"
        type="search"
        name="q"
        value={value}
        placeholder="Palermo, parrilla, loft…"
        autoComplete="off"
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

export default SearchInput;
