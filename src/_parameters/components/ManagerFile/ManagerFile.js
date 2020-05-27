/**
 * Component for uploading files from Manager File
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 *
 */
import React, { useRef, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { DropzoneDialog } from 'material-ui-dropzone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import TablePxp from '../../../_pxp/components/Table/TablePxp';
import LoadingScreen from '../../../_pxp/components/LoadingScreen';
import Pxp from '../../../Pxp';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 30,
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1),
  },
  avatarYellow: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1),
    color: theme.palette.getContrastText('#ffd600'),
    backgroundColor: '#ffd600',
    cursor: 'pointer',
  },
}));

const ManagerFile = ({ idTable, table }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [loadingScreen, setLoadingScreen] = useState(false);

  const [dropZone, setDropZone] = React.useState({
    open: false,
    idTypeFile: undefined,
  });
  const refManagerFileTable = useRef();

  const getUrlForView = (row) => {
    let urlFile = '';
    if (row.id_archivo) {
      urlFile = row.folder;
      urlFile = urlFile.split('./../../../')[1];
      urlFile = `http://34.71.236.75/kerp/${urlFile}${row.nombre_archivo}.${row.extension}`;
    }
    return urlFile;
  };

  // this function is for inactive the file
  const removeFile = (row) => {
    Pxp.apiClient
      .doRequest({
        url: 'parametros/Archivo/removeArchivoGrilla',
        params: {
          id_archivo: row.id_archivo,
          id_tipo_archivo: row.id_tipo_archivo,
          id_tabla: row.id_tabla,
        },
      })
      .then((resp) => {
        setLoadingScreen(false);
        enqueueSnackbar(resp.detail.message, {
          variant: !resp.error ? 'success' : 'error',
          action: <Button>See all</Button>,
        });
        refManagerFileTable.current.handleRefresh();
      });
  };

  const jsonItem = {
    tableName: 'Manager File',
    columns: {
      codigo: {
        label: 'Codigo',
        renderColumn: (row) => {
          return (
            <Box display="flex" alignItems="center">
              {row.id_archivo && row.estado_reg !== 'inactivo' ? (
                <Avatar className={classes.avatar} src={getUrlForView(row)} />
              ) : (
                <Avatar
                  className={classes.avatarYellow}
                  onClick={() => {
                    setDropZone({
                      open: true,
                      idTypeFile: row.id_tipo_archivo,
                    });
                  }}
                >
                  <CloudUploadIcon />
                </Avatar>
              )}
              {}
              <div>
                <Typography variant="body2" color="inherit">
                  {row.codigo}
                </Typography>
              </div>
            </Box>
          );
        },
      },
    },
    getDataTable: {
      url: 'parametros/Archivo/listarArchivoCodigo',
      params: {
        start: '0',
        limit: '50',
        sort: 'tipar.orden',
        dir: 'ASC', // for seeing every time the last save
        id_tabla: idTable,
        tabla: table,
      },
    },
    idStore: 'id_tipo_archivo',
    buttonDel: false,
    buttonNew: false,
    buttonCheckList: false,
    actionsTableCell: {
      buttonDel: false,
      buttonEdit: false,
      extraButtons: {
        uploadFile: {
          label: 'Upload File',
          buttonIcon: <CloudUploadIcon />,
          onClick: (row) => {
            setDropZone({
              open: true,
              idTypeFile: row.id_tipo_archivo,
            });
          },
        },
        viewFile: {
          label: 'View File',
          buttonIcon: <VisibilityIcon />,
          onClick: (row) => {
            window.open(getUrlForView(row));
          },
          disabled: true,
        },
        deleteFile: {
          label: 'Delete File',
          buttonIcon: <DeleteIcon />,
          onClick: (row) => {
            removeFile(row);
          },
          disabled: true,
        },
      },
    },
    onClickRow: ({ row, statesButtonsTableCell }) => {
      if (row.id_archivo && row.estado_reg !== 'inactivo') {
        statesButtonsTableCell.viewFile.enable();
        statesButtonsTableCell.deleteFile.enable();
      } else {
        statesButtonsTableCell.viewFile.disable();
        statesButtonsTableCell.deleteFile.disable();
      }
    },
  };

  const uploadFile = (files) => {
    const formData = new FormData();
    formData.append('archivo', files[0]);
    formData.append('id_tabla', idTable);
    formData.append('tabla', table);
    formData.append('multiple', '');
    formData.append('id_tipo_archivo', dropZone.idTypeFile);
    formData.append('nombre_descriptivo', '');

    setLoadingScreen(true);
    setDropZone({
      open: false,
      idTypeFile: undefined,
    });
    connection
      .doRequest({
        url: 'parametros/Archivo/subirArchivo',
        params: formData,
        type: 'upload',
        redirect: 'follow',
      })
      .then((resp) => {
        setLoadingScreen(false);
        enqueueSnackbar(resp.detail.message, {
          variant: !resp.error ? 'success' : 'error',
          action: <Button>See all</Button>,
        });
        refManagerFileTable.current.handleRefresh();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <PerfectScrollbar id="content">
        <TablePxp dataConfig={jsonItem} ref={refManagerFileTable} />
        <DropzoneDialog
          acceptedFiles={['image/*']}
          cancelButtonText="cancel"
          submitButtonText="submit"
          maxFileSize={5000000}
          open={dropZone.open}
          onClose={() => {
            setDropZone({
              open: false,
              idTypeFile: undefined,
            });
          }}
          onSave={(files) => {
            uploadFile(files);
          }}
          showPreviews
          showFileNamesInPreview
        />
      </PerfectScrollbar>
      {loadingScreen && <LoadingScreen />}
    </>
  );
};

export default ManagerFile;
