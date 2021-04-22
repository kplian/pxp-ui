import React, { useState } from 'react';
import * as Yup from 'yup';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import WcIcon from '@material-ui/icons/Wc';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Label from '../../../components/Label';
import TablePxp from '../../../components/Table/TablePxp';
import MasterDetail from '../../../components/MasterDetail';
// import SplitPane, { Pane } from 'react-split-pane';
import Split from 'react-split';

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    height: '100%',
    '& .gutter': {
      border: theme.palette.action.disabled + ' 1px solid',
      backgroundColor: theme.palette.action.disabledBackground,
      width: '4px !important',
    }
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1),
  },
}));

const Translation = () => {
  const classes = useStyles();
  const [showDetail, setShowDetail] = useState(false);
  const jsonWord = {
    nameForm: 'Word Key',
    dataReader: {
      dataRows: 'data',
      total: 'count',
    },
    columns: {
      code: {
        type: 'TextField',
        initialValue: '',
        label: 'Codigo',
        gridForm: { xs: 12, sm: 4 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Required'),
        },
        renderColumn: (row) => {
          return (
            <Box display="flex" alignItems="center">
              <div>
                <Typography variant="subtitle1" color="inherit">
                  {row.code}
                </Typography>
                <Typography variant="body2" color="inherit">
                  <b>Predeterminado: </b>{row.defaultText}
                </Typography>
                <Label color="success">
                  <b>Grupo:</b>
                  {row.group?.name}
                </Label>
              </div>
            </Box>
          );
        },
      },
      groupName: {
        type: 'AutoComplete',
        label: 'Grupo',
        store: {
          dataReader: {
            dataRows: 'data',
          },
          method: 'GET',
          url: `pxp/translate/groups/list`,
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
        gridForm: { xs: 12, sm: 4 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Required'),
        },
        grid: false,
      },
      defaultText: {
        type: 'TextField',
        initialValue: '',
        label: 'Texto Predeterminado',
        gridForm: { xs: 12, sm: 4 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Required'),
        },
        grid: false,
        filters: { pfiltro: 'name', type: 'string' },
        search: true,
      },
    },
    getDataTable: {
      url: 'pxp/translate/words/list',
      method: 'GET',
      params: {
        start: '0',
        limit: '10',
        sort: 'wordKeyId',
        dir: 'DESC',
        relations: ['group']
      },
      load: true,
    },
    idStore: 'wordKeyId',
    buttonDel: true,
    buttonNew: true,
    buttonEdit: true,
    actionsTableCell: {
      buttonDel: true,
      buttonEdit: true,
    },
    onClickRow: ({ row }) => {
      setShowDetail(true);
      console.log(row);
    },
    resetButton: true,
    onSubmit: {
      urlAdd: 'pxp/translate/words/add',
      urlEdit: 'pxp/translate/words/edit',
    },
    urlDelete: 'pxp/translate/words/delete',
  };

  const jsonTranslation = {
    nameForm: 'Formulario Persona',
    dataReader: {
      dataRows: 'data',
      total: 'count',
    },
    columns: {
      text: {
        type: 'TextField',
        initialValue: '',
        label: 'Texto',
        gridForm: { xs: 12, sm: 4 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Required'),
        },
      },
      languageId: {
        type: 'AutoComplete',
        label: 'Lenguaje',
        store: {
          dataReader: {
            dataRows: 'data',
          },
          method: 'GET',
          url: `pxp/languages/list`,
          idDD: 'languageId',
          descDD: 'name',
          parFilters: 'name',
          params: {
            sort: 'name',
            start: 0,
            limit: 10,
            dir: 'DES',
          }
        },
        gridForm: { xs: 12, sm: 4 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Required'),
        },
        filters: { pfiltro: 'name', type: 'string' },
        search: true,
      },
    },
    getDataTable: {
      url: 'pxp/translate/translations/list',
      method: 'GET',
      params: {
        start: '0',
        limit: '10',
        sort: 'translateId',
        dir: 'DESC',
      },
      load: true,
    },
    idStore: 'translateId',
    buttonDel: true,
    buttonNew: true,
    buttonEdit: true,
    actionsTableCell: {
      buttonDel: true,
      buttonEdit: true,
    },
    resetButton: true,
    onSubmit: {
      urlAdd: 'pxp/translate/translations/add',
      urlEdit: 'pxp/translate/translations/edit',
    },
    urlDelete: 'pxp/translate/translations/delete',
  };

  // return <TablePxp dataConfig={jsonTranslation} />;
  return (
    <MasterDetail
      sizes={[30, 70]}
      className={classes.content}
      showDetail={showDetail}
      setShowDetail={setShowDetail}
    >
      <TablePxp dataConfig={jsonWord} />
      <TablePxp dataConfig={jsonTranslation} />
    </MasterDetail>
  );
}

export default Translation;
