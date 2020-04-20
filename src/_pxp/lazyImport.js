import { lazy } from 'react';
const pages = {};

pages.Example = { 
    path: '/main',
    component: lazy(() => import('./components/Example'))
};
export default pages;