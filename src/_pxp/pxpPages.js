import { lazy } from 'react';
const pages = {};

pages.PRESU__InitPage = {
  path: '/segu/init',
  component: lazy(() => import('./components/ExampleTable'))
};

pages.CONTA__InitPage = {
  path: '/segu/usuario',
  component: lazy(() => import('./components/ExampleForm'))
};
pages.Example = {
  path: '/segu/usuario',
  component: lazy(() => import('../_security/components/person/PersonForm'))
};
export default pages;
