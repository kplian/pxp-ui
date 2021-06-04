import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { DropzoneArea } from 'material-ui-dropzone';
import axios from 'axios';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography } from '@material-ui/core';
import Pxp from '../../../../Pxp';
import LoadButton from '../../../components/LoadButton/LoadButton';

const useStyles = makeStyles((theme) => ({
  drop: {
    minWidth: '300px',
    minHeight: '200px',
  },
}));

const UploadModal = ({ handleClose, open }) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [files, setFiles] = React.useState([]);
  const [result, setResult] = React.useState(null);
  const server = `${Pxp.apiClient.protocol}://${Pxp.apiClient.host}:${Pxp.apiClient.port}/${Pxp.apiClient.baseUrl}`;

  // Progress
  const [loading, setLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);

  const client = axios.create({
    baseURL: server,
  });

  const importCsv = () => {
    const formData = new FormData();
    formData.append('file', files[0]);
    setLoading(true);
    client
      .post(`/pxp/translate/groups/import`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onDownloadProgress: (progressEvent) => {
          const { total } = progressEvent;
          const current = progressEvent.loaded;
          const percentCompleted = Math.floor((current / total) * 100);
          setProgress(percentCompleted);
          setBuffer(percentCompleted + 10);
        },
      })
      .then(({ data }) => {
        setLoading(false);
        setResult(data);
        setFiles([]);
      });
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Import Translates</DialogTitle>
      <DialogContent>
        {loading && (
          <LinearProgress
            variant="buffer"
            value={progress}
            valueBuffer={buffer}
          />
        )}
        {!result && (
          <DropzoneArea
            id="drop-files"
            dropzoneClass={classes.drop}
            dropzoneText="Drag and drop a file XLSX here or click"
            onChange={setFiles}
          />
        )}
        {result && (
          <div>
            <p>{result?.message}</p>
            <p>{`Grupos modificados: ${result?.groups}`}</p>
            <p>{`Registros modificados: ${result?.records}`}</p>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={handleClose}
          color="primary"
          variant="outlined"
        >
          Cancelar
        </Button>
        <LoadButton
          onClick={importCsv}
          color="primary"
          autoFocus
          variant="contained"
          loading={loading}
          disabled={files.length === 0}
        >
          Import Translates
        </LoadButton>
      </DialogActions>
    </Dialog>
  );
};

export default UploadModal;
