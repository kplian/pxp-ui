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
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useTranslation } from 'react-i18next';
import Avatar from '@material-ui/core/Avatar';
import Label from '../../../_pxp/components/Label';
import fm from './UserFieldMapping';
import imgAvatar from '../../../_pxp/components/Table/avatar.jpeg';

// define mapping fields name for v1 and v2 backends

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1),
  },
}));

const UserBox = ({ row }) => {
  const classes = useStyles();
  const { t } = useTranslation('segu');
  return (
    <Box display="flex" alignItems="center">
      <Avatar className={classes.avatar} src={imgAvatar} />
      <div>
        <Typography variant="body2" color="inherit">
          <b>{t('name')}: </b>
          {row[fm.completeName]}
        </Typography>
        <Label color="success">
          <b>{t('username')}: </b>
          {row[fm.username]}
        </Label>
        <br />
        <Label color="success">{row[fm.autenticationType]}</Label>
      </div>
    </Box>
  );
};

export default {
  [fm.name]: {
    type: 'TextField',
    label: 'user',
    filters: {
      pfiltro: `${fm.name}#${fm.surname1}#${fm.surname2}#${fm.username}`,
      type: 'string',
    },
    search: true,
    renderColumn: (row) => {
      return (
        <>
          <UserBox row={row} />
        </>
      );
    },
  },
  [fm.email]: {
    type: 'TextField',
    label: 'email',
  },
  [fm.expireDate]: {
    type: 'DatePicker',
    label: 'expireDate',
  },
  [fm.createdDate]: {
    type: 'DatePicker',
    label: 'createdDate',
  },
};
