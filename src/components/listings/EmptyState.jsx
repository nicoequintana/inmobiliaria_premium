import { LISTINGS } from '../../data/listings.js';
import ClearFilters from '../filters/ClearFilters.jsx';

// Presentational: the designed no-results state. Never a blank area.
function EmptyState({ onClear }) {
  return (
    <div className="empty-state" role="status">
      <h2>No hay propiedades con esos filtros</h2>
      <p className="empty-state__lede">
        Probá ampliando el precio máximo, sumando zonas o quitando algún filtro. El catálogo demo tiene{' '}
        <strong>{LISTINGS.length} propiedades</strong> para explorar.
      </p>
      <ClearFilters onClear={onClear}>Limpiar filtros y ver todo</ClearFilters>
    </div>
  );
}

export default EmptyState;
