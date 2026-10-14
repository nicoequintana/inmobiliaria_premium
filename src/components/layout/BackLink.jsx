import { Link } from 'react-router-dom';

import Icon from '../ui/Icon.jsx';

// Visible exit on every navigable page, at every breakpoint.
function BackLink({ to, children }) {
  return (
    <Link className="back-link" to={to}>
      <Icon name="arrow-left" size={18} />
      {children}
    </Link>
  );
}

export default BackLink;
