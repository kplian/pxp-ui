import React from 'react';
import Fab from '@material-ui/core/Fab';
import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Form from '../../../_pxp/components/Form/Form';
import moment from 'moment';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '40px',
    marginTop: theme.spacing(1),
    position: 'relative',
  },
  fab: {
    position: 'absolute',
    // bottom: theme.spacing(2),
    right: theme.spacing(1),
  },
  collapse: {
    position: 'absolute',
    top: theme.spacing(0),
    left: theme.spacing(0),
    zIndex: theme.zIndex.modal,
    width: 'calc(100% - 56px)'
  },
  paper: {
    border: `solid 1px ${theme.palette.secondary.main}`
  },
}));

const FilterReport = ({ columns, changeFilters, values = null }) => {
  const classes = useStyles();
  const [active, setActive] = React.useState(false);
  const refForm = React.useRef();
  const formFilter = {
    nameForm: 'Filtros',
    columns,
    resetButton: false,
    submitLabel: 'Filtrar',
    onSubmit: ({ values }) => {
      Object.keys(values).forEach(key => {
        const valueEmpty = values[key] === '' || values[key] === undefined;
        if (columns[key].type === 'AutoComplete' && valueEmpty) {
          values[key] = '%';
        } else if (valueEmpty) {
          values[key] = '%';
        }
      });

      changeFilters(values);
      setActive(false);
    },
  };

  React.useEffect(() => {
    if (active && values) {
      const form = refForm.current.states;
      const valuesParse = JSON.parse(values);

      Object.keys(columns).forEach(key => {

        switch (columns[key].type) {
          case 'AutoComplete': {
            // form[key].setValue({
            //   // [columns[key].store.idDD]: valuesParse[key],
            //   // [columns[key].store.descDD]: valuesParse[key],
            // });
          } break;
          case 'DatePicker':
            form[key].setValue(moment(valuesParse[key], 'YYYY-MM-DD').toDate());
            break;
          default: {
            if (valuesParse[key] !== '%') {
              form[key].setValue(valuesParse[key]);
            };
          } break;
        }
      });
    }
  }, [active])

  return (
    <div className={classes.root}>
      <Fab size="small"
        color="secondary"
        aria-label="filter"
        className={classes.fab}
        onClick={() => setActive(!active)}
      >
        <Icon>{active ? 'close' : 'filter_alt'}</Icon>
      </Fab>
      <Collapse in={active} className={classes.collapse} >
        <Paper elevation={3} className={classes.paper}>
          <Form data={formFilter} ref={refForm}></Form>
        </Paper>
      </Collapse>
    </div>
  )
};

export default FilterReport;
