/**
 * Beefree
 * @copyright Kplian 2021
 * @author Favio Figueroa
 */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import makeStyles from '@mui/styles/makeStyles';
import BeePage from './bee_page';
import { Pxp } from '@pxp-ui/core';
import DialogPxp from '../DialogPxp';
import { useJsonStore } from '@pxp-ui/hooks';
import { Theme } from '@mui/material';

const useStyles: any = makeStyles((theme:Theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
const Beefree = ({ afterSave, templateId }) => {
  console.log(templateId)
  const classes = useStyles();

  const getDataTable = {
    method: 'GET',
    url: 'pxp/Template/list',
    params: {
      start: '0',
      limit: '10',
      sort: 'templateId',
      dir: 'DESC',
      templateId,
    },
    load: !!templateId,
  };
  const {state,
    set,
    data,
    setData,
    loading,
    error} = useJsonStore(getDataTable, Pxp);

  const [init, setInit] = useState(false);
  const [template, setTemplate] = useState();
  const [dataInsert, setDataInsert] = useState<any>();
  const [openDialogForSave, setOpenDialogForSave] = useState(false);
  const [nameTemplate, setNameTemplate] = useState();
  useEffect(() => {
    if (dataInsert && dataInsert.mode === 'add') {
      setOpenDialogForSave(true);
    }
  }, [dataInsert]);

  useEffect(() => {
    console.log('useEffect');
  }, []);

  useEffect(() => {
    console.log('useEffect data', data);
    if(data) {
      data.data && setTemplate(data.data.jsonTemplate);
      console.log('init with template')
      setInit(true);
    }
    if(!templateId) {
      console.log('init without template')
      setInit(true);
    }

  }, [data]);


  let id = templateId;
  const save = ({ jsonFile, htmlFile }) => {
    Pxp.apiClient
      .doRequest({
        url: `pxp/Template/${id ? `edit/${id}` : `add`}`,
        method: id ? 'PATCH' : 'POST',
        params: {
          // name: '',
          htmlTemplate: htmlFile,
          jsonTemplate: jsonFile,
          ...(id && { templateId: parseInt(id, 10) }),
        },
      })
      .then((resp) => {
        id = resp.templateId;
        setDataInsert(resp);

        /* enqueueSnackbar('Success', {
          variant: 'success',
          action: <Button>See all</Button>,
        }); */
      })
      .catch((err) => {
        /* enqueueSnackbar(err.message, {
          variant: 'error',
        }); */
      });
  };
  const onchangeName = (e) => {
    setNameTemplate(e.target.value);
  };
  const saveName = (e) => {
    e.preventDefault();

    Pxp.apiClient
      .doRequest({
        url: `pxp/Template/edit/${dataInsert.templateId}`,
        method: 'PATCH',
        params: {
          name: nameTemplate,
          templateId: parseInt(dataInsert.templateId, 10),
        },
      })
      .then((resp) => {
        setOpenDialogForSave(false);
        if (typeof afterSave === 'function') {
          afterSave(resp);
        }
      })
      .catch((err) => {
        /* enqueueSnackbar(err.message, {
          variant: 'error',
        }); */
      });
  };

  return (
    <>
      {init && <BeePage template={template} handleSave={save} />}
      <DialogPxp
        titleToolbar="name" // change your our description
        fullScreen={false}
        onClose={() => {
          setOpenDialogForSave(false);
        }}
        open={openDialogForSave}
      >
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <TextField
                  value={nameTemplate}
                  onChange={onchangeName}
                  id="outlined-basic"
                  label="Template Name"
                  variant="outlined"
                />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Button
                  onClick={(e) => saveName(e)}
                  variant="contained"
                  color="primary"
                >
                  Save
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </DialogPxp>
    </>
  );
};

export default Beefree;
