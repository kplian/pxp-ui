import React, { useState, useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import FilterReport from './FilterReport';
import TableReport from './TableReport';
import {
  useParams
} from 'react-router-dom';
import Pxp from '../../../Pxp';
import moment from 'moment';

const columnsAddGridForm = (filters) => {
  Object.keys(filters).forEach(key => {
    filters[key] = { ...filters[key], gridForm: { xs: 12, sm: 6, md: 6, lg: 4 } };
  });
  return filters;
};

const getDefaultValues = (filters) => {
  let vals = {};

  Object.keys(filters).forEach(key => {
    if (key.includes('date') || key.includes('fecha')) {

      // especial filters 
      if (key === 'date_from' && !filters[key].default) {
        vals[key] = moment().format('YYYY-MM-01');
      } else if (key === 'date_to' && !filters[key].default) {
        vals[key] = moment().format('YYYY-MM-DD');
      } else {
        switch (filters[key].default) {
          case 'NOW': vals[key] = moment().format('YYYY-MM-DD'); break;
          case 'FIRST': vals[key] = moment().format('YYYY-MM-01'); break;
          default: vals[key] = moment().format('YYYY-MM-DD'); break;
        }
      }

    } else if (key.includes('id')) {
      vals[key] = '%';
    } else {
      vals[key] = '%';
    }
  });

  return vals;
}

const ViewReport = () => {
  const [columns, setColumns] = useState({});
  const [filters, setFilters] = useState({});
  const [name, setName] = useState(null);
  const [load, setLoad] = useState(true);
  const [values, setValues] = useState(null);
  const params = useParams();

  const changeFilters = (values) => {
    setValues(JSON.stringify(values));
  };

  const getReportData = (reportId) => {
    setLoad(true);
    Pxp.apiClient.doRequest({
      url: `reports/${reportId}/data`,
      method: 'GET',
    }).then(report => {

      let filters = columnsAddGridForm(JSON.parse(report.filters));
      setFilters(filters);
      const columns = JSON.parse(report.config);
      setColumns(columns);
      setValues(JSON.stringify(getDefaultValues(filters)));
      setName(report.name);
      setLoad(false);
    }).catch(err => { });
  };

  useEffect(() => {
    getReportData(params.reportId);
  }, [params]);
  return (
    <div>
      { load && <LinearProgress color="secondary" />}
      { !load && <FilterReport columns={filters} changeFilters={changeFilters} values={values} />}
      { !load && <h2>{name}</h2>}
      { !load && <TableReport columns={columns} filters={values} />}
    </div>
  )
};

export default ViewReport;
