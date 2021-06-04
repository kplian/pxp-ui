/* eslint-disable react/no-array-index-key */
import { List, ListItem } from '@material-ui/core';
import { GitHub } from '@material-ui/icons';
import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Pxp from '../../../Pxp';

const useStyles = makeStyles((theme) => ({
  active: {
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.background.dark,
    '& $title': {
      fontWeight: theme.typography.fontWeightBold,
    },
    '& $icon': {
      color: theme.palette.secondary.main,
    },
  },
}));

const ListReport = ({ groupId, onRowClick }) => {
  const { url } = useRouteMatch();
  const classes = useStyles();
  const [reports, setReports] = React.useState([]);
  const getReports = () => {
    localStorage.setItem('currentFilterReport', '{}');
    Pxp.apiClient
      .doRequest({
        url: `reports/${groupId}`,
        method: 'GET',
      })
      .then(setReports);
  };

  React.useEffect(() => {
    getReports();
  }, []);

  return (
    <List>
      {reports.map((report, i) => (
        <ListItem
          button
          component={NavLink}
          onClick={onRowClick}
          activeClassName={classes.active}
          to={`${url}/${report.reportId}`}
          key={`report${i}`}
        >
          {i + 1}. {report.name}
        </ListItem>
      ))}
    </List>
  );
};

export default ListReport;
