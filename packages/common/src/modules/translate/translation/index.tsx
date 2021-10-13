import React, { useState, useRef, useEffect } from 'react';
import * as Yup from 'yup';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import WcIcon from '@material-ui/icons/Wc';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Split from 'react-split';
import Label from '@pxp-ui/components/Label';
import TablePxp from '@pxp-ui/components/Table/TablePxp';
import MasterDetail from '@pxp-ui/components/MasterDetail';
import Pxp from '@pxp-ui/core/Pxp';
import TranslateSelect from './TranslateSelect';
// import SplitPane, { Pane } from 'react-split-pane';

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    height: '100%',
    '& .gutter': {
      border: `${theme.palette.action.disabled} 1px solid`,
      backgroundColor: theme.palette.action.disabledBackground,
      width: '4px !important',
    },
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
  const [groups, setGroups] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [lang, setLang] = useState(null);
  const refWord = useRef(null);
  const refTranslates = useRef(null);
  const loadGroups = () => {
    Pxp.apiClient
      .doRequest({
        url: `pxp/translate/groups/list`,
        method: 'GET',
        params: {
          limit: 10,
          start: 0,
          sort: 'code',
          dir: 'ASC',
        },
      })
      .then((resp) =>
        setGroups(
          resp.data.map((item) => ({
            label: item.name,
            value: item.translationGroupId,
          })),
        ),
      );
  };

  const reloadTableWords = () => {
    const { set } = refWord.current.jsonStore;
    set((prevData) => ({
      ...prevData,
      load: true,
      url: `pxp/translate/words/group/${currentGroup}`,
    }));
  };

  const reloadTabletranslates = () => {
    const { set } = refTranslates.current.jsonStore;
    set((prevData) => ({
      ...prevData,
      load: true,
      url: `pxp/translate/translations/word/${currentWord}`,
    }));
  };
  const handleChangeGroup = (groupId) => {
    setCurrentGroup(groupId);
  };

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
                  <b style={{ fontSize: '0.7rem' }}>Predeterminado: </b>
                  {row.defaultText}
                </Typography>
                <Label color="success" style={{}}>{row.group?.name}</Label>
              </div>
            </Box>
          );
        },
      },
      // translationGroupId: {
      //   type: 'AutoComplete',
      //   label: 'Grupo',
      //   store: {
      //     dataReader: {
      //       dataRows: 'data',
      //     },
      //     method: 'GET',
      //     url: `pxp/translate/groups/list`,
      //     idDD: 'translationGroupId',
      //     descDD: 'name',
      //     parFilters: 'name',
      //     params: {
      //       sort: 'name',
      //       start: 0,
      //       limit: 10,
      //       dir: 'DES',
      //     }
      //   },
      // gridForm: { xs: 12, sm: 4 },
      // variant: 'outlined',
      // validate: {
      //   shape: Yup.string().required('Required'),
      // },
      // grid: false,
      // },
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
      url: `pxp/translate/words/group/${currentGroup}`,
      method: 'GET',
      params: {
        start: '0',
        limit: '10',
        sort: 'wordKeyId',
        dir: 'DESC',
        relations: ['group'],
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
      setCurrentWord(row.wordKeyId);
    },
    resetButton: true,
    onSubmit: {
      urlAdd: 'pxp/translate/words/add',
      urlEdit: 'pxp/translate/words/edit',
      extraParams: {
        translationGroupId: currentGroup,
      },
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
          },
        },
        gridForm: { xs: 12, sm: 4 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Required'),
        },
        filters: { pfiltro: 'name', type: 'string' },
        search: true,
        renderColumn: (row) => row.language.name,
      },
    },
    getDataTable: {
      url: `pxp/translate/translations/word/${currentWord}`,
      method: 'GET',
      params: {
        start: '0',
        limit: '10',
        sort: 'translateId',
        dir: 'DESC',
      },
      load: false,
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
      extraParams: {
        wordId: currentWord,
      },
    },
    urlDelete: 'pxp/translate/translations/delete',
  };

  useEffect(() => {
    if (currentGroup) reloadTableWords();
  }, [currentGroup]);

  useEffect(() => {
    if (currentWord) reloadTabletranslates();
  }, [lang, currentWord]);

  useEffect(() => {
    loadGroups();
  }, []);

  // return <TablePxp dataConfig={jsonTranslation} />;
  return (
    <MasterDetail
      sizes={[30, 70]}
      className={classes.content}
      showDetail={showDetail}
      setShowDetail={setShowDetail}
    >
      <div>
        <h2>Grupo</h2>
        <TranslateSelect
          options={groups}
          title="Grupo"
          handleChange={handleChangeGroup}
        />
        {currentGroup && <TablePxp dataConfig={jsonWord} ref={refWord} />}
      </div>
      <div>
        <h2>Traducciones</h2>
        {currentWord && (
          <TablePxp dataConfig={jsonTranslation} ref={refTranslates} />
        )}
      </div>
    </MasterDetail>
  );
};

export default Translation;
