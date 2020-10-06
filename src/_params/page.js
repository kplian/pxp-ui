import { lazy } from 'react';

const pages = {};

pages.CITA_Admin = {
  path: '/params/accountStatusType',
  component: lazy(() => import('../_params/views/accountStatusType')),
};

export default pages;
