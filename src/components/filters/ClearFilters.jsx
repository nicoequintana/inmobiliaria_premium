// Presentational: resets every filter. Used by the filter bar and the empty state.
function ClearFilters({ onClear, children = 'Limpiar filtros' }) {
  return (
    <button type="button" className="btn btn--ghost" onClick={onClear}>
      {children}
    </button>
  );
}

export default ClearFilters;
