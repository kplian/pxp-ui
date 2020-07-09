import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Pxp from '../../../Pxp';
import { getUrlForView } from '../../utils/Common';
import useWindowSize from '../../hooks/useWindowSize';
import Confirm from '../Alert/Confirm';

const useStyles = makeStyles((theme) => ({
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
const DrawGridListImage = ({ data, isAdmin, refresData }) => {
  const classes = useStyles();
  const [showImage, setShowImage] = useState({
    open: false,
  });
  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    dataRow: undefined,
  });

  const [heightScreen, setHeightScreen] = useState();
  const size = useWindowSize();
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
    setConfirmDelete({
      open: true,
      data: rowSelectedAux,
    });
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
      <GridList
        style={{ maxHeight: `calc(${heightScreen}px - 50px)` }}
        cellHeight={200}
        spacing={0}
        className={classes.gridList}
      >
        {data.datos.map((image) => (
          <GridListTile
            key={image.nombre_archivo}
            /* cols={tile.featured ? 2 : 1}
            rows={tile.featured ? 2 : 1} */
            cols={1}
            rows={1}
          >
            <img src={getUrl(image)} alt={image.nombre_archivo} />
            <GridListTileBar
              // title={image.nombre_archivo}
              title=""
              titlePosition="top"
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
          </GridListTile>
        ))}
      </GridList>

      {showImage.open && (
        <Dialog
          onClose={handleCloseImage}
          aria-labelledby="customized-dialog-title"
          open={showImage.open}
        >
          <DialogTitle disableTypography className={classes.root}>
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

export default DrawGridListImage;
