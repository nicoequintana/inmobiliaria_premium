// Designed loading state for Suspense boundaries: never a blank screen.
function LoadingState() {
  return (
    <div className="container">
      <div className="loading-state" role="status" aria-live="polite">
        <span className="loading-state__spinner" aria-hidden="true" />
        <p>Cargando propiedades…</p>
      </div>
    </div>
  );
}

export default LoadingState;
