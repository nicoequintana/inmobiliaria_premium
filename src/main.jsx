import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import router from './App.jsx';
import ErrorBoundary from './components/ui/ErrorBoundary.jsx';
import './styles/index.scss';

const container = document.getElementById('root');

createRoot(container).render(
  <ErrorBoundary>
    <RouterProvider router={router} />
  </ErrorBoundary>,
);
