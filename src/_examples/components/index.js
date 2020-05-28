/**
 * Lazy load of example pages
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
import { lazy } from 'react';

const pages = {};

pages.EXA_FormExample = {
  path: '/exa/form',
  component: lazy(() => import('./form/ExampleForm')),
};

// @todo all examples must be in examples folder
pages.EXA_TableExample = {
  path: '/exa/table',
  component: lazy(() => import('./table/ExampleTable')),
};

pges.EXA_MasterDetailExample = {
  path: '/exa/masterdetail',
  translationsNS: ['segu'],
  component: lazy(() => import('../../_security/components/user/User')),
};

pages.EXA__MapExample = {
  path: '/exa/map',
  component: lazy(() => import('../../_pxp/components/Map/CustomMapMarkers')),
};

pages.EXA__CustomComponent = {
  path: '/exa/custom',
  component: lazy(() => import('./CustomComponent')),
};

pages.EXA__CustomComponent2 = {
  path: '/exa/custom2',
  component: lazy(() => import('./CustomComponent2')),
};

export default pages;
