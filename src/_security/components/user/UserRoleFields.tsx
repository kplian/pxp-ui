/**
 * User table fields
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 * @todo add last password change date
 * @todo add last login attempt date
 * @todo add number of login fails
 */
import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import Label from '../../../_pxp/components/Label';
import fm from './UserFieldMapping';
import am from '../../../_pxp/apiManager';

// define mapping fields name for v1 and v2 backends

const UserBox = ({ row }) => {
  const { t } = useTranslation('segu_user');
  return (
    <Box display="flex" alignItems="center">
      <div>
        <Typography variant="body2" color="inherit">
          <b>{t('role')}: </b>
          {row[fm.roleName]}
        </Typography>
        <Label color="success">
          <b>{t('system')}: </b>
          {row[fm.roleSystem]}
        </Label>
      </div>
    </Box>
  );
};

export default {
  [fm.role]: {
    type: 'AutoComplete',
    label: 'role',
    store: {
      url: am.segu.role.list,
      params: {
        start: '0',
        limit: '10',
        sort: fm.roleName,
        dir: 'ASC',
      },
      parFilters: `${fm.roleName}#${fm.roleSystem}`,
      idDD: fm.role,
      descDD: fm.roleName,
      minChars: 2,
    },
    remote: true,
    gridForm: { xs: 12, sm: 12 },
    variant: 'outlined',
    validate: {
      shape: Yup.string().required('Required'),
    },
    renderColumn: (row) => {
      return (
        <>
          <UserBox row={row} />
        </>
      );
    },
  },
};
