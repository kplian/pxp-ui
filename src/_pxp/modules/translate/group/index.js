import React from 'react';
import * as Yup from 'yup';
import Icon from '@material-ui/core/Icon';

import makeStyles from '@material-ui/core/styles/makeStyles';
import { green, yellow } from '@material-ui/core/colors';
import TablePxp from '../../../components/Table/TablePxp';
import Pxp from '../../../../Pxp';
import UploadModal from './UploadModal';
import ExportModal from './ExportModal';


const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

const Group = () => {
  const classes = useStyles();
  const [openModalUpload, setOpenModalUpload] = React.useState(false);
  const [openModalExport, setOpenModalExport] = React.useState(false);

  const server = `${Pxp.apiClient.protocol}://${Pxp.apiClient.host}:${Pxp.apiClient.port}/${Pxp.apiClient.baseUrl}`;

  const generateJson = () => {
    window.open(`${server}/pxp/translate/groups/json`, '_blank');
  };

  const generateCsv = () => {
    window.open(`${server}/pxp/translate/groups/csv`, '_blank');
  };

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
        type: 'Dropdown',
        store: [
          { value: '', label: '' },
          { value: 'interface', label: 'interface' },
          { value: 'table', label: 'table' },
        ],
        label: 'Tipo',
        gridForm: { xs: 12, sm: 4 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Required'),
        },
        filters: { pfiltro: 'isDefault', type: 'string' },
        search: true,
        onChange: ({ value, states }) => {
          const hidden = value === 'interface';
          states.tableName.setIsHide(hidden);
          states.columnTranslate.setIsHide(hidden);
          states.module.setIsHide(hidden);
        },
      },
      module: {
        type: 'AutoComplete',
        store: {
          dataReader: {
            dataRows: 'data',
          },
          method: 'GET',
          url: `pxp/translate/groups/modules`,
          idDD: 'name',
          descDD: 'name',
          parFilters: 'name',
          params: {
            sort: 'name',
            start: 0,
            limit: 10,
            dir: 'DES',
          },
        },
        gridForm: { xs: 12, sm: 4 },
        variant: 'outlined',
        hide: true,
        onChange: ({ value, states }) => {
          states.tableName.store.set({
            ...states.tableName.store.state,
            url: `pxp/translate/groups/modules/${value}/entities`,
          });
        },
      },
      tableName: {
        type: 'AutoComplete',
        store: {
          dataReader: {
            dataRows: 'data',
          },
          method: 'GET',
          url: `pxp/translate/groups/modules/pxp/entities`,
          idDD: 'name',
          descDD: 'name',
          parFilters: 'name',
          params: {
            sort: 'name',
            start: 0,
            limit: 10,
            dir: 'DES',
          },
        },
        label: 'Nombre Tabla',
        gridForm: { xs: 12, sm: 4 },
        variant: 'outlined',
        validate: {
          // shape: Yup.string().required('Required'),
        },
        filters: { pfiltro: 'isDefault', type: 'string' },
        search: true,
        hide: true,
        onChange: ({ value, states }) => {
          console.log(states.columnTranslate);
          states.columnTranslate.store.set({
            ...states.columnTranslate.store.state,
            url: `pxp/translate/groups/entities/${value}/fields`,
          });
        },
      },
      columnTranslate: {
        type: 'AutoComplete',
        store: {
          dataReader: {
            dataRows: 'data',
          },
          method: 'GET',
          url: `pxp/translate/groups/entities/Person/fields`,
          idDD: 'name',
          descDD: 'name',
          parFilters: 'name',
          params: {
            sort: 'name',
            start: 0,
            limit: 10,
            dir: 'DES',
          },
        },
        label: 'Columna a Traducir',
        gridForm: { xs: 12, sm: 4 },
        variant: 'outlined',
        validate: {
          // shape: Yup.string().required('Required'),
        },
        filters: { pfiltro: 'isDefault', type: 'string' },
        search: true,
        hide: true,
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
      urlAdd: 'pxp/translate/groups/',
      urlEdit: 'pxp/translate/groups/edit',
      extraParams: {},
    },
    urlDelete: 'pxp/translate/groups/delete',
    buttonsToolbar: {
      generateJsonFiles: {
        onClick: (e) => generateJson(),
        icon: <Icon style={{ color: yellow[800] }}>source</Icon>,
        title: 'Generar JSON files',
      },
      generateCsvFiles: {
        onClick: (e) => {
          setOpenModalExport(true);
          // generateCsv()
        },
        icon: <Icon style={{ color: green[500] }}>format_list_numbered</Icon>,
        title: 'Generar Csv File',
      },
      modalUploadCsv: {
        onClick: (e) => setOpenModalUpload(true),
        icon: <Icon style={{ color: yellow[900] }}>upload_file</Icon>,
        title: 'Upload Csv File',
      },
    },
  };

  return (
    <div>
      <TablePxp dataConfig={jsonGroup} />
      {
        openModalUpload &&
        <UploadModal
          open={openModalUpload}
          handleClose={() => setOpenModalUpload(false)}
        />
      }
      <ExportModal open={openModalExport}
        handleClose={() => setOpenModalExport(false)} />
    </div>
  );
};

export default Group;
