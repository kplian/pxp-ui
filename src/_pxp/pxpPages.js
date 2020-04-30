import { lazy } from 'react';

const pages = {};

pages.Example = {
  path: '/segu/usuario',
  component: lazy(() => import('../_security/components/person/PersonForm')),
};
export default pages;
