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

const Group = () => {
  const classes = useStyles();

  const jsonGroup = {
    nameForm: 'Formulario Persona',
    dataReader: {
      dataRows: 'data',
      total: 'count', // this total is the count of whole data the count in the query for example the pxp ever sending count
    },
    columns: {
      code: {
        type: 'TextField',
        initialValue: '',
        // typeTextField: 'password',
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
        initialValue: '',
        label: 'Nombre',
        gridForm: { xs: 12, sm: 4 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Required'),
        },
        filters: { pfiltro: 'name', type: 'string' },
        search: true,
      },
      type: {
        type: 'TextField',
        initialValue: '',
        label: 'Tipo',
        gridForm: { xs: 12, sm: 4 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Required'),
        },
        filters: { pfiltro: 'isDefault', type: 'string' },
        search: true,
      },

      tableName: {
        type: 'AutoComplete',
        store: {
          dataReader: {
            dataRows: 'data',
          },
          method: 'GET',
          url: `pxp/translate/groups/entities`,
          idDD: 'name',
          descDD: 'name',
          parFilters: 'name',
          params: {
            sort: 'name',
            start: 0,
            limit: 10,
            dir: 'DES',
          }
        },
        label: 'Nombre Tabla',
        gridForm: { xs: 12, sm: 4 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Required'),
        },
        filters: { pfiltro: 'isDefault', type: 'string' },
        search: true,
      },
      columnKey: {
        type: 'AutoComplete',
        store: {
          dataReader: {
            dataRows: 'data',
          },
          method: 'GET',
          url: `pxp/translate/groups/entities/Person/fields`,
          idDD: 'translationGroupId',
          descDD: 'name',
          parFilters: 'name',
          params: {
            sort: 'name',
            start: 0,
            limit: 10,
            dir: 'DES',
          }
        },
        label: 'Columna Clave',
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
      url: 'pxp/translate/groups/list',
      method: 'GET',
      params: {
        start: '0',
        limit: '10',
        sort: 'translationGroupId',
        dir: 'DESC', // for seeing every time the last save
      },
      load: true,
    },
    idStore: 'translationGroupId',
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
      urlAdd: 'pxp/translate/groups/add',
      urlEdit: 'pxp/translate/groups/edit',
      extraParams: {

      },
    },
    urlDelete: 'pxp/translate/groups/delete',
  };

  return <TablePxp dataConfig={jsonGroup} />;
}

export default Group;
