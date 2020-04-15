import { lazy } from 'react';
const pages = {};
pages.Example = lazy(() => import('./components/Example'));

export default pages;