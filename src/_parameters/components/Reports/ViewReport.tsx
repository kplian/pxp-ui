import React, { useState, useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { Scrollbars } from 'react-custom-scrollbars';
import { makeStyles } from '@material-ui/core/styles';
import FilterReport from './FilterReport';
import TableReport from './TableReport';
import Pxp from '../../../Pxp';
import useWindowSize from '../../../_pxp/hooks/useWindowSize';
import MasterDetail from './MasterDetail';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: '2px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.1rem',
      textAlign: 'center',
      marginBottom: '2px',
    },
  },
}));

const columnsAddGridForm = (filters) => {
  Object.keys(filters).forEach((key) => {
    filters[key] = {
      ...filters[key],
      gridForm: { xs: 12, sm: 6, md: 6, lg: 4 },
    };
  });
  return filters;
};

const getDefaultValues = (filters) => {
  const vals = {};

  Object.keys(filters).forEach((key) => {
    if (key.includes('date') || key.includes('fecha')) {
      // especial filters
      if (key === 'date_from' && !filters[key].default) {
        vals[key] = moment().format('YYYY-MM-01');
      } else if (key === 'date_to' && !filters[key].default) {
        vals[key] = moment().format('YYYY-MM-DD');
      } else {
        switch (filters[key].default) {
          case 'NOW':
            vals[key] = moment().format('YYYY-MM-DD');
            break;
          case 'FIRST':
            vals[key] = moment().format('YYYY-MM-01');
            break;
          default:
            vals[key] = moment().format('YYYY-MM-DD');
            break;
        }
      }
    } else if (key.includes('id')) {
      vals[key] = '%';
    } else {
      vals[key] = '%';
    }
  });

  return vals;
};

const ViewReport = () => {
  const [columns, setColumns] = useState({});
  const [config, setConfig] = useState({});
  const [filters, setFilters] = useState({});
  const [name, setName] = useState(null);
  const [load, setLoad] = useState(true);
  const [values, setValues] = useState(null);
  const [reportId, setReportId] = useState(null);
  const params = useParams();
  const size = useWindowSize();
  const [heightScreen, setHeightScreen] = useState(size.height);
  const classes = useStyles();

  const changeFilters = (values) => {
    localStorage.setItem('currentFilterReport', JSON.stringify(values));
    setValues(JSON.stringify(values));
  };

  const getReportData = (reportId) => {
    setLoad(true);
    Pxp.apiClient
      .doRequest({
        url: `reports/${reportId}/data`,
        method: 'GET',
      })
      .then((report) => {
        const filters = columnsAddGridForm(JSON.parse(report.filters));
        setFilters(filters);
        const config = JSON.parse(report.config);
        setConfig(config);
        setColumns(config.columns);
        setValues(JSON.stringify(getDefaultValues(filters)));
        setName(report.name);
        setLoad(false);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    setReportId(params.reportId);
  }, [params]);

  useEffect(() => {
    if (reportId) {
      getReportData(params.reportId);
    }
  }, [reportId]);

  useEffect(() => {
    setHeightScreen(size.height);
  }, [size]);

  return (
    <div>
      {load && <LinearProgress color="secondary" />}
      {!load && (
        <FilterReport
          columns={filters}
          changeFilters={changeFilters}
          values={values}
        />
      )}
      {!load && <h2 className={classes.title}>{name}</h2>}

      <Scrollbars
        autoHide
        renderView={(props) => (
          <div
            {...props}
            style={{ ...props.style, overflowX: 'hidden', marginBottom: 0 }}
          />
        )}
        style={{
          minHeight: '250px',
          height: `calc(${heightScreen}px - 190px)`,
        }}
      >
        {!load && config.detail && (
          // <TableReport columns={columns} filters={values} />
          <MasterDetail>
            <TableReport columns={columns} filters={values} />
            <TableReport
              columns={config.columnsDetail}
              filters={values}
              isDetail
            />
          </MasterDetail>
        )}
        {!load && !config.detail && (
          <TableReport columns={columns} filters={values} />
        )}
      </Scrollbars>
    </div>
  );
};

export default ViewReport;
