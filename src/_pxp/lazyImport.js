import { lazy } from 'react';
const pages = {};

pages.SEGU__usuario = { 
    path: '/segu/usuario',
    component: lazy(() => import('./components/Example'))
};
export default pages;