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

pages.i18n_Languages = {
  path: '/translate/languages',
  translationsNS: ['segu'],
  component: lazy(() => import('./modules/translate/language')),
};

pages.i18n_Groups = {
  path: '/translate/groups',
  translationsNS: ['segu'],
  component: lazy(() => import('./modules/translate/group')),
};

pages.i18n_Translations = {
  path: '/translate/translations',
  translationsNS: ['segu'],
  component: lazy(() => import('./modules/translate/translation')),
};

export default pages;
