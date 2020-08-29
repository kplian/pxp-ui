/**
 * Component for uploading files from Manager File
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 *
 */
import React, { useRef, useState } from 'react';
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
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import ImageIcon from '@material-ui/icons/Image';
import { Image } from '@material-ui/icons';
import TablePxp from '../../../_pxp/components/Table/TablePxp';
import LoadingScreen from '../../../_pxp/components/LoadingScreen';
import GridListImage from '../../../_pxp/components/GridListImage/GridListImage';
import Pxp from '../../../Pxp';
import DialogPxp from '../../../_pxp/components/DialogPxp';
import File from '../../../_pxp/icons/File';
import TypeFile from '../TypeFile/TypeFile';

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
  avatarRed: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1),
    color: theme.palette.getContrastText('#a40909'),
    backgroundColor: '#a40909',
    cursor: 'no-drop',
  },
}));

const ManagerFile = ({
  idTable,
  table,
  idTableDesc,
  buttonViewFile = true,
  buttonUploadFile = true,
  buttonDeleteFile = true,
  buttonFileType = true,
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [loadingScreen, setLoadingScreen] = useState(false);

  const [dropZone, setDropZone] = React.useState({
    open: false,
    idTypeFile: undefined,
    extensionsAllowed: undefined,
    multiple: false,
    typeFile: undefined,
    acceptedFiles: undefined,
  });

  const [gridListImage, setGridListImage] = useState({
    open: false,
    idTypeFile: undefined,
  });
  const [openTypeFile, setOpenTypeFile] = useState(false);
  const refManagerFileTable = useRef();

  const getUrlForView = (row) => {
    let urlFile = '';
    if (row.id_archivo) {
      urlFile = row.folder;
      urlFile = urlFile.split('./../../../')[1];
      urlFile = `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_HOST}/${urlFile}${row.nombre_archivo}.${row.extension}`;
    }
    return urlFile;
  };

  const viewAlbumData = ({ idTypeFile }) => {
    setGridListImage({
      open: true,
      idTypeFile,
    });
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

  const openFile = () => {};
  const jsonItem = {
    tableName: 'Manager File',
    columns: {
      codigo: {
        label: 'Codigo',
        renderColumn: (row) => {
          return (
            <Box display="flex" alignItems="center">
              {row.id_archivo &&
                row.estado_reg !== 'inactivo' &&
                row.tipo_archivo === 'imagen' && (
                  <Avatar className={classes.avatar} src={getUrlForView(row)} />
                )}

              {buttonUploadFile ? (
                <Avatar
                  className={classes.avatarYellow}
                  onClick={() => {
                    setDropZone({
                      open: true,
                      idTypeFile: row.id_tipo_archivo,
                      extensionsAllowed: row.extensiones_permitidas,
                      multiple: row.multiple === 'si',
                      acceptedFiles:
                        row.tipo_archivo === 'imagen'
                          ? ['image/*']
                          : ['image/*', 'video/*', 'application/*'],
                    });
                  }}
                >
                  <CloudUploadIcon />
                </Avatar>
              ) : (
                <Avatar
                  {...(row.id_archivo
                    ? {
                        className: classes.avatarYellow,
                        onClick: () => window.open(getUrlForView(row)),
                      }
                    : { className: classes.avatarRed })}
                >
                  {row.tipo_archivo === 'documento' ? (
                    <InsertDriveFileIcon />
                  ) : (
                    <ImageIcon />
                  )}
                </Avatar>
              )}
              {}
              <div>
                <Typography variant="h6" color="inherit">
                  {row.nombre}{' '}
                  <Typography variant="caption" color="inherit">
                    ({row.codigo})
                  </Typography>
                </Typography>

                {row.id_archivo &&
                  row.estado_reg !== 'inactivo' &&
                  row.tipo_archivo === 'documento' && (
                    <Typography variant="caption" display="block" gutterBottom>
                      ver Documento
                    </Typography>
                  )}
                {row.multiple === 'si' && row.tipo_archivo === 'imagen' && (
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    onClick={() =>
                      viewAlbumData({ idTypeFile: row.id_tipo_archivo })
                    }
                  >
                    ver Album
                  </Typography>
                )}
              </div>
            </Box>
          );
        },
      },
    },
    getDataTable: {
      url: 'parametros/Archivo/getTypeFile',
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
    buttonsToolbar: {
      ...(buttonFileType && {
        fileType: {
          onClick: () => {
            setOpenTypeFile(true);
          },
          icon: <File />,
          title: 'Type File',
        },
      }),
    },
    actionsTableCell: {
      buttonDel: false,
      buttonEdit: false,
      extraButtons: {
        ...(buttonUploadFile && {
          uploadFile: {
            label: 'Upload File',
            buttonIcon: <CloudUploadIcon />,
            onClick: (row) => {
              setDropZone({
                open: true,
                idTypeFile: row.id_tipo_archivo,
                extensionsAllowed: row.extensiones_permitidas,
                multiple: row.multiple === 'si',
                typeFile: row.tipo_archivo,
                acceptedFiles:
                  row.tipo_archivo === 'imagen'
                    ? ['image/*']
                    : ['image/*', 'video/*', 'application/*'],
              });
            },
          },
        }),
        ...(buttonViewFile && {
          viewFile: {
            label: 'View File',
            buttonIcon: <VisibilityIcon />,
            onClick: (row) => {
              window.open(getUrlForView(row));
            },
            disabled: true,
          },
        }),
        ...(buttonDeleteFile && {
          deleteFile: {
            label: 'Delete File',
            buttonIcon: <DeleteIcon />,
            onClick: (row) => {
              removeFile(row);
            },
            disabled: true,
          },
        }),
      },
    },
    paginationType: 'infiniteScrolling',
    onClickRow: ({ row, statesButtonsTableCell }) => {
      if (row.id_archivo && row.estado_reg !== 'inactivo') {
        buttonViewFile && statesButtonsTableCell.viewFile.enable();
        buttonDeleteFile && statesButtonsTableCell.deleteFile.enable();
      } else {
        buttonViewFile && statesButtonsTableCell.viewFile.disable();
        buttonDeleteFile && statesButtonsTableCell.deleteFile.disable();
      }
    },
  };

  const uploadFile = (files) => {
    let methodUpload;
    const formData = new FormData();
    if (files.length > 1) {
      methodUpload = 'subirArchivoMultiple';
      for (let i = 0; i < files.length; i++) {
        formData.append('archivo[]', files[i]);
      }
    } else {
      formData.append('archivo', files[0]);
      methodUpload = 'subirArchivo';
    }

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
    Pxp.apiClient
      .doRequest({
        url: `parametros/Archivo/${methodUpload}`,
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

  const handleCloseDialog = () => {
    setGridListImage({
      open: false,
    });
  };
  const handleCloseDialogTypeFile = () => {
    setOpenTypeFile(false);
  };
  return (
    <>
      <TablePxp dataConfig={jsonItem} ref={refManagerFileTable} />
      <DropzoneDialog
        {...(!dropZone.multiple && { filesLimit: 1 })}
        acceptedFiles={dropZone.acceptedFiles}
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
      <DialogPxp
        titleToolbar="Galeria"
        onClose={handleCloseDialog}
        open={gridListImage.open}
      >
        <GridListImage
          idTable={idTable}
          idTypeFile={gridListImage.idTypeFile}
          isAdmin
        />
      </DialogPxp>
      <DialogPxp
        titleToolbar="Type File"
        onClose={handleCloseDialogTypeFile}
        open={openTypeFile}
      >
        <TypeFile table={table} idTableDesc={idTableDesc} />
      </DialogPxp>
      {loadingScreen && <LoadingScreen />}
    </>
  );
};

export default ManagerFile;
