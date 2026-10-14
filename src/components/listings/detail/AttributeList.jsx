import { OPERATION_LABELS, TIPO_LABELS } from '../../../data/listings.js';
import { formatPrice } from '../../../lib/filters.js';

// Presentational: attribute summary of a listing.
function AttributeList({ listing }) {
  const rows = [
    { term: 'Operación', value: OPERATION_LABELS[listing.operation] ?? listing.operation },
    { term: 'Tipo', value: TIPO_LABELS[listing.tipo] ?? listing.tipo },
    { term: 'Zona', value: listing.zone },
    { term: 'Ambientes', value: listing.rooms },
    { term: 'Baños', value: listing.bathrooms },
    { term: 'Superficie', value: `${listing.surfaceM2} m²` },
    { term: 'Precio', value: formatPrice(listing) },
  ];

  return (
    <dl className="attribute-list">
      {rows.map((row) => (
        <div className="attribute-list__row" key={row.term}>
          <dt className="attribute-list__term">{row.term}</dt>
          <dd className="attribute-list__value">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default AttributeList;
