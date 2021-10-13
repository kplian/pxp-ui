import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import LinearProgress from '@material-ui/core/LinearProgress';
import _ from 'lodash';
import Pxp from '@pxp-ui/core/Pxp';
import LoadButton from '@pxp-ui/components/LoadButton/LoadButton';
import TransferList from '@pxp-ui/components/TransferList';

const useStyles = makeStyles((theme) => ({
  drop: {
    minWidth: '300px',
    minHeight: '200px',
  },
}));

const ExportModal = ({ handleClose, open }) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [groups, setGroups] = React.useState([]);
  const [langs, setLangs] = React.useState([]);
  const [filters, setFilters] = React.useState({
    groups: [],
    langs: [],
  });
  const server = `${Pxp.apiClient.protocol}://${Pxp.apiClient.host}:${Pxp.apiClient.port}/${Pxp.apiClient.baseUrl}`;

  // Progress
  const [loading, setLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);

  const client = axios.create({
    baseURL: server,
    withCredentials: true,
    params: {
      start: 0,
      limit: 50,
      dir: 'ASC',
      sort: 'code',
    },
  });

  const loadGroups = () => {
    return client.get('/pxp/translate/groups/list');
  };

  const loadLangs = () => {
    return client.get('/pxp/languages/list');
  };

  const exportCsv = () => {
    const langsFilter =
      filters.langs < langs ? JSON.stringify(_.map(filters.langs, 'code')) : '';
    const groupsFilter =
      filters.groups < groups
        ? JSON.stringify(_.map(filters.groups, 'code'))
        : '';
    window.open(
      `${server}/pxp/translate/groups/csv?langs=${encodeURIComponent(
        langsFilter,
      )}&groups=${encodeURIComponent(groupsFilter)}`,
      '_blank',
    );
    handleClose();
  };

  React.useEffect(() => {
    loadGroups()
      .then(({ data }) => {
        setGroups(data.data);
        return loadLangs();
      })
      .then(({ data }) => setLangs(data.data));
  }, []);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        Export Groups Translates
      </DialogTitle>
      <DialogContent>
        <Typography variant="h4" color="secondary">
          Lenguajes
        </Typography>
        <TransferList
          data={langs}
          field="code"
          handleChange={(result) =>
            setFilters((prev) => ({ ...prev, langs: result }))
          }
        />
        <Typography variant="h4" color="secondary">
          Grupos
        </Typography>
        <TransferList
          data={groups}
          field="code"
          handleChange={(result) =>
            setFilters((prev) => ({ ...prev, groups: result }))
          }
        />
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
          onClick={exportCsv}
          color="primary"
          autoFocus
          variant="contained"
          loading={loading}
          disabled={filters.groups.length === 0 || filters.langs.length === 0}
        >
          Exportar
        </LoadButton>
      </DialogActions>
    </Dialog>
  );
};

export default ExportModal;
