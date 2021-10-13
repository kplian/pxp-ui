/**
 * Lazy load of pxp translate pages
 * @copyright Kplian Ltda 2021
 * @uthor Israel Cm
 */
import { lazy } from 'react';

declare interface Page {
  component: any;
  path: string;
  translationsNS?: string[],
}


declare interface Pages {
  [key: string]: Page
}

const pages: Pages = {};

pages.i18n_Languages = {
  path: '/translate/languages',
  translationsNS: ['segu'],
  component: lazy(() => import('./language')),
};

pages.i18n_Groups = {
  path: '/translate/groups',
  translationsNS: ['segu'],
  component: lazy(() => import('./group')),
};

pages.i18n_Translations = {
  path: '/translate/translations',
  translationsNS: ['segu'],
  component: lazy(() => import('./translation')),
};

export default pages;
