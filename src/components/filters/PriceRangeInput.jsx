import { PRICE_MAX, PRICE_MIN, PRICE_STEP, formatUSD } from '../../lib/filters.js';

// Presentational: maximum-price slider. The top of the range means "sin límite",
// which is why a value at PRICE_MAX is omitted from the URL.
function PriceRangeInput({ value, onChange }) {
  const current = value ? Number(value) : PRICE_MAX;
  const isUnlimited = current >= PRICE_MAX;
  const display = isUnlimited ? 'Sin límite' : formatUSD(current);

  return (
    <div className="filter-field filter-field--range">
      <label className="filter-field__label" htmlFor="filtro-precio">
        Precio máximo
        <output className="filter-range__value" htmlFor="filtro-precio">
          {display}
        </output>
      </label>
      <input
        id="filtro-precio"
        className="filter-range"
        type="range"
        min={PRICE_MIN}
        max={PRICE_MAX}
        step={PRICE_STEP}
        value={current}
        aria-valuetext={display}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

export default PriceRangeInput;
