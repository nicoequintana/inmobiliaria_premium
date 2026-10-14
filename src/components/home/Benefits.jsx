import { Link } from 'react-router-dom';

import Icon from '../ui/Icon.jsx';

// Home-only: the four "why us" cards. Each card links into the catalog, so the
// circular arrow is a real affordance and not a dead control.
const BENEFITS = [
  {
    icon: 'gem',
    title: 'Asesoramiento experto',
    text: 'Acompañamiento en cada paso de la búsqueda, con lectura de zona, valores y momento de mercado.',
  },
  {
    icon: 'house',
    title: 'Selección curada',
    text: 'Un catálogo acotado y revisado: cada propiedad se publica con su ficha, fotos y datos completos.',
  },
  {
    icon: 'key',
    title: 'Experiencia sin fricción',
    text: 'De la consulta a la visita coordinada por WhatsApp o email, sin formularios ni cuentas.',
  },
  {
    icon: 'chart-bar',
    title: 'Inversión inteligente',
    text: 'Precios en dólares y comparables por zona para decidir con contexto, no con urgencia.',
  },
];

function Benefits() {
  return (
    <ul className="benefits">
      {BENEFITS.map((benefit) => (
        <li key={benefit.title}>
          <Link
            className="benefit"
            to="/propiedades"
            aria-label={`Ver propiedades — ${benefit.title}`}
          >
            <span className="benefit__icon" aria-hidden="true">
              <Icon name={benefit.icon} size={26} strokeWidth={1.5} />
            </span>
            <h3 className="benefit__title">{benefit.title}</h3>
            <p className="benefit__text">{benefit.text}</p>
            <span className="circle-arrow benefit__arrow" aria-hidden="true">
              <Icon name="arrow-right" size={16} />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Benefits;
