import { Link } from 'react-router-dom';

// Presentational error state. The recovery path is always a visible link home.
function ErrorState() {
  return (
    <div className="container">
      <div className="error-state" role="alert">
        <h1>Algo no salió como esperábamos</h1>
        <p className="error-state__lede">
          No pudimos mostrar esta sección. Podés volver al inicio y continuar navegando el catálogo demo.
        </p>
        <Link className="btn btn--primary" to="/">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default ErrorState;
