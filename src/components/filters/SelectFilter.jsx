// Presentational: a labelled select. Used for type, zone and room count.
function SelectFilter({ id, label, anyLabel, value, onChange, options }) {
  return (
    <div className="filter-field">
      <label className="filter-field__label" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className="filter-select"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">{anyLabel}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectFilter;
