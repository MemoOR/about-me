import type { RouteRecord } from 'vite-react-ssg';
import HomePage from './pages/HomePage';
import ThreeWorldPage from './pages/ThreeWorldPage';
import RootRedirect from './pages/RootRedirect';
import NotFound from './pages/NotFound';

// Explicit, language-prefixed routes (mirrors the Flask URL scheme) so every
// page is deterministically prerendered by vite-react-ssg.
export const routes: RouteRecord[] = [
  { path: '/', element: <RootRedirect /> },
  { path: '/en', element: <HomePage lang="en" /> },
  { path: '/es', element: <HomePage lang="es" /> },
  { path: '/en/3dworld', element: <ThreeWorldPage lang="en" /> },
  { path: '/es/mundo3d', element: <ThreeWorldPage lang="es" /> },
  { path: '*', element: <NotFound /> },
];
