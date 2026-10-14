// Presentational: announces how many listings match the current filters.
function ResultCount({ count }) {
  return (
    <p className="result-count" aria-live="polite" aria-atomic="true">
      <span className="result-count__value">{count}</span>{' '}
      {count === 1 ? 'propiedad encontrada' : 'propiedades encontradas'}
    </p>
  );
}

export default ResultCount;
