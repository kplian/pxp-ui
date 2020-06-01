/**
 * Lazy load of pxp pages
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
import { lazy } from 'react';

const pages = {};

pages.SEGU_User = {
  path: '/segu/user',
  translationsNS: ['segu'],
  component: lazy(() => import('../_security/components/user/User')),
};

export default pages;
