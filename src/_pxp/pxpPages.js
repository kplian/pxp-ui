/**
 * Lazy load of pxp pages
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
import { lazy } from 'react';

const pages = {};

pages.Example = {
  path: '/segu/usuario',
  component: lazy(() => import('../_security/components/person/PersonForm')),
};
export default pages;
