import BackLink from '../../layout/BackLink.jsx';

// Presentational: a detail URL that matches no listing still gets a designed page.
function NotFoundBlock() {
  return (
    <div className="container">
      <div className="not-found-block" role="status">
        <p className="eyebrow">Código inexistente</p>
        <h1>No encontramos esa propiedad</h1>
        <p className="not-found-block__lede">
          El enlace no corresponde a ninguna propiedad del catálogo demo. Puede haber cambiado el código o el enlace
          estar incompleto.
        </p>
        <BackLink to="/propiedades">Volver al catálogo</BackLink>
      </div>
    </div>
  );
}

export default NotFoundBlock;
