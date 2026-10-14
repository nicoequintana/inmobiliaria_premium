import { Suspense, lazy, useEffect } from 'react';
import { Outlet, createBrowserRouter, useLocation, useNavigationType } from 'react-router-dom';

import SiteFooter from './components/layout/SiteFooter.jsx';
import SiteHeader from './components/layout/SiteHeader.jsx';
import LoadingState from './components/ui/LoadingState.jsx';

// Route-level code splitting: each page becomes its own chunk.
const HomePage = lazy(() => import('./routes/HomePage.jsx'));
const CatalogPage = lazy(() => import('./routes/CatalogPage.jsx'));
const ListingDetailPage = lazy(() => import('./routes/ListingDetailPage.jsx'));
const NotFoundPage = lazy(() => import('./routes/NotFoundPage.jsx'));

// Every lazy route renders a designed loading state while its chunk loads.
function LazyRoute({ children }) {
  return <Suspense fallback={<LoadingState />}>{children}</Suspense>;
}

// New destinations start at the top; browser back keeps the restored scroll.
// A hash target (e.g. "/#contacto") scrolls to its section instead.
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'auto', block: 'start' });
        return;
      }
    }

    if (navigationType === 'PUSH') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [pathname, hash, navigationType]);

  return null;
}

function RootLayout() {
  return (
    <div className="site">
      <ScrollToTop />
      <SiteHeader />
      <main id="contenido-principal" className="site__main">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: (
          <LazyRoute>
            <HomePage />
          </LazyRoute>
        ),
      },
      {
        path: '/propiedades',
        element: (
          <LazyRoute>
            <CatalogPage />
          </LazyRoute>
        ),
      },
      {
        path: '/propiedades/:id',
        element: (
          <LazyRoute>
            <ListingDetailPage />
          </LazyRoute>
        ),
      },
      {
        path: '*',
        element: (
          <LazyRoute>
            <NotFoundPage />
          </LazyRoute>
        ),
      },
    ],
  },
]);

export default router;
