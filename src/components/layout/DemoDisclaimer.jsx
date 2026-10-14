// Site-wide, non-dismissible demo label (honesty rule: no fake data, no urgency).
function DemoDisclaimer() {
  return (
    <p className="demo-badge" role="note" aria-label="Sitio de demostración con datos ficticios">
      <span className="demo-badge__dot" aria-hidden="true" />
      Demo · datos ficticios
    </p>
  );
}

export default DemoDisclaimer;
