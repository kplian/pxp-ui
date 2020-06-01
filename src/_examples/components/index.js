/**
 * Lazy load of pxp pages
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
import { lazy } from 'react';

const pages = {};

pages.EXA_FormExample = {
  path: '/exa/form',
  // component: lazy(() => import('./ExampleForm')),
  component: lazy(() => import('./ExampleProductsSlider')),
};

// @todo all examples must be in examples folder
pages.EXA_TableExample = {
  path: '/exa/table',
  component: lazy(() => import('../../_pxp/components/ExampleTable')),
};

pages.EXA_MasterDetailExample = {
  path: '/exa/masterdetail',
  component: lazy(() => import('../../_security/components/user/User')),
};

pages.EXA__MapExample = {
  path: '/exa/map',
  component: lazy(() => import('../../_pxp/components/Map/CustomMapMarkers')),
};


/** LIST COMPONENT */
pages.EXALIST__options= {
  path: '/exa/list/options',
  component: lazy(() => import('./List/ExampleList')),
};

pages.EXALIST__search= {
  path: '/exa/list/search',
  component: lazy(() => import('./List/ExampleList')),
};



export default pages;
