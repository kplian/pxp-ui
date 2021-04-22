import React from 'react';
import * as Yup from 'yup';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import WcIcon from '@material-ui/icons/Wc';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Label from '../../../components/Label';
import imgAvatar from '../../../components/Table/avatar.jpeg';
import TablePxp from "../../../components/Table/TablePxp";


const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1),
  },
}));

const Language = () => {
  const classes = useStyles();

  const jsonLanguage = {
    nameForm: 'Formulario Persona',
    dataReader: {
      dataRows: 'data',
      total: 'count', // this total is the count of whole data the count in the query for example the pxp ever sending count
    },
    columns: {
      code: {
        type: 'TextField',
        label: 'Codigo',
        gridForm: { xs: 12, sm: 4 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Required'),
        },
        // renderColumn: (row) => {
        //   return (
        //     <Box display="flex" alignItems="center">
        //       <Avatar className={classes.avatar} src={imgAvatar} />
        //       <div>
        //         <Typography variant="body2" color="inherit">
        //           <b>Nombre:</b>
        //           {row.nombre_completo2}
        //         </Typography>
        //         <Label color="success">
        //           <b>Ci:</b>
        //           {row.ci}
        //         </Label>
        //       </div>
        //     </Box>
        //   );
        // },
      },
      name: {
        type: 'TextField',
        label: 'Nombre',
        gridForm: { xs: 12, sm: 4 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Required'),
        },
        filters: { pfiltro: 'name', type: 'string' },
        search: true,
      },
      isDefault: {
        type: 'TextField',
        initialValue: '',
        label: 'Por defecto',
        gridForm: { xs: 12, sm: 4 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Required'),
        },
        filters: { pfiltro: 'isDefault', type: 'string' },
        search: true,
      },
    },
    getDataTable: {
      url: 'pxp/languages/list',
      method: 'GET',
      params: {
        start: '0',
        limit: '10',
        sort: 'languageId',
        dir: 'DESC', // for seeing every time the last save
      },
      load: true,
    },
    idStore: 'languageId',
    buttonDel: true,
    buttonNew: true,
    buttonEdit: true,
    actionsTableCell: {
      buttonDel: true,
      buttonEdit: true,
      /* icon: <AddShoppingCartIcon />,
      onClick: (row) => {
        alert('llega');
        console.log(row);
      }, */
    },
    resetButton: true,
    onSubmit: {
      urlAdd: 'pxp/languages/add',
      urlEdit: 'pxp/languages/edit',
      extraParams: {

      },
    },
    urlDelete: 'pxp/languages/delete',
  };

  return <TablePxp dataConfig={jsonLanguage} />;
}

export default Language;
