import BackLink from '../components/layout/BackLink.jsx';

// Designed 404 for any unknown URL. Always offers a visible way home.
function NotFoundPage() {
  return (
    <div className="container">
      <div className="not-found" role="status">
        <p className="not-found__code" aria-hidden="true">
          404
        </p>
        <h1>Página no encontrada</h1>
        <p className="not-found__lede">
          La dirección que buscás no existe en este sitio demo. Podés volver al inicio o seguir explorando el catálogo
          de propiedades.
        </p>
        <BackLink to="/">Volver al inicio</BackLink>
      </div>
    </div>
  );
}

export default NotFoundPage;
