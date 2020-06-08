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

pages.EXA_MasterDetailExample = {
  path: '/exa/masterdetail',
  translationsNS: ['segu'],
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

/** WIZARD COMPONENT */
pages.WZD__Vertical= {
  path: '/exa/wizard/vertical',
  component: lazy(() => import('./Wizard/ExampleWizardVertical')),
};

pages.WZD__Horizontal= {
  path: '/exa/wizard/horizontal',
  component: lazy(() => import('./Wizard/ExampleWizard')),
};


pages.EXA__CustomComponent = {
  path: '/exa/custom',
  component: lazy(() => import('./CustomComponent')),
};

// pages.EXA__CustomComponent2 = {
//   path: '/exa/custom2',
//   component: lazy(() => import('./CustomComponent2')),
// };

pages.EXA__CustomComponent2 = {
  path: '/list',
  component: lazy(() => import('./Products/Example')),
};

export default pages;
