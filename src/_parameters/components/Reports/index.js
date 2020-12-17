import React from 'react'
import { Grid, Paper } from '@material-ui/core';
import ConfigReport from './ConfigReport';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from 'react-router-dom';
import TableReport from './TableReport';
import FilterReport from './FilterReport';
import ViewReport from './ViewReport';


const Reports = () => {
  let { path, url } = useRouteMatch();
  const [filters, setFilters] = React.useState({});

  const columns = [
    {
      name: 'Reporte Generales',
      id: 1,
    },
    {
      name: 'Reportes Gráficos',
      id: 1,
    }
  ];

  const changeReport = (report) => {
    console.log('[filters]', report);
    setFilters(JSON.parse(report.filters));
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item sm={12} md={4} lg={3}>
          <ConfigReport columns={columns} ></ConfigReport>
        </Grid>
        <Grid item sm={12} md={8} lg={9}>
          <Switch>
            <Route exact path={path}>
              <h3>Please select a report.</h3>
            </Route>
            <Route path={`${path}/:reportId`}>
              <ViewReport></ViewReport>
            </Route>
          </Switch>
        </Grid>
      </Grid>
    </div>
  )
}

export default Reports;

