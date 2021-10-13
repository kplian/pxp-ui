/**
 * DrawImageListImage
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
import React, { useEffect, useState, FC } from 'react';
import { makeStyles } from '@mui/styles';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Pxp } from '@pxp-ui/core';
import { getUrlForView } from '@pxp-ui/core/utils/Common';
import { useWindowSize } from '@pxp-ui/hooks';
import Confirm from '../Alert/Confirm';
import { Theme } from '@mui/material';

const useStyles: any = makeStyles((theme:Theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    // height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
  dialogTitle: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));
const DrawImageListImage: FC<any> = ({ data, isAdmin, refresData }) => {
  const classes = useStyles();
  const [showImage, setShowImage] = useState<any>({
    open: false,
  });
  const [confirmDelete, setConfirmDelete] = useState<any>({
    open: false,
    dataRow: undefined,
  });

  const [heightScreen, setHeightScreen] = useState();
  const size: any = useWindowSize();
  useEffect(() => {
    setHeightScreen(size.height);
  }, [size]);
  const getUrl = (row) => {
    const urlFile = getUrlForView({
      nameFile: row.nombre_archivo,
      folder: row.folder,
      extension: row.extension,
      size: 'mediano',
    });
    return urlFile;
  };

  const viewImage = (image) => {
    const url = getUrlForView({
      nameFile: image.nombre_archivo,
      folder: image.folder,
      extension: image.extension,
    });
    setShowImage({
      open: true,
      url,
    });
  };
  const handleCloseImage = () => {
    setShowImage({
      open: false,
    });
  };

  const handleConfirmDelete = (rowSelectedAux) => {
    setConfirmDelete(prev => ({
      ...prev,
      open: true,
      data: rowSelectedAux,
    }));
  };

  const removeImg = (image) => {
    Pxp.apiClient
      .doRequest({
        url: 'parametros/Archivo/removeArchivoGrilla',
        params: {
          id_archivo: image.id_archivo,
        },
      })
      .then((resp) => {
        refresData();
      });
  };

  return (
    <div className={classes.root}>
      <ImageList
        style={{ maxHeight: `calc(${heightScreen}px - 50px)` }}
        rowHeight={200}
        gap={0}
        className={classes.gridList}
      >
        {data.datos.map((image) => (
          <ImageListItem
            key={image.nombre_archivo}
            /* cols={tile.featured ? 2 : 1}
            rows={tile.featured ? 2 : 1} */
            cols={1}
            rows={1}
          >
            <img src={getUrl(image)} alt={image.nombre_archivo} />
            <ImageListItemBar
              // title={image.nombre_archivo}
              title=""
              position="top"
              actionIcon={
                <div>
                  <IconButton
                    aria-label="star"
                    className={classes.icon}
                    onClick={() => viewImage(image)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                  {isAdmin && (
                    <IconButton
                      aria-label="star"
                      className={classes.icon}
                      onClick={() => handleConfirmDelete(image)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </div>
              }
              actionPosition="left"
              className={classes.titleBar}
            />
          </ImageListItem>
        ))}
      </ImageList>

      {showImage.open && (
        <Dialog
          onClose={handleCloseImage}
          aria-labelledby="customized-dialog-title"
          open={showImage.open}
        >
          <DialogTitle className={classes.root}>
            <Typography variant="h6">Image</Typography>
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={handleCloseImage}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <img src={showImage.url} width="100%" />
          </DialogContent>
        </Dialog>
      )}
      <Confirm
        openConfirm={confirmDelete.open}
        setOpenConfirm={setConfirmDelete}
        dialogContentText="¿Está seguro de eliminar la imagen?"
        data={confirmDelete.data}
        onConfirm={removeImg}
      />
    </div>
  );
};

export default DrawImageListImage;
