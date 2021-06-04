/* eslint-disable react/no-array-index-key */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ListReport from './ListReport';

const Accordion = withStyles((theme) => ({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
}))(MuiAccordion);

const AccordionSummary = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background,
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    color: theme.palette.primary.main,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
}))(MuiAccordionSummary);
const ConfigReport = ({ columns = [], onRowClick }) => {
  const [expanded, setExpanded] = React.useState('panel0');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      {columns.map((column, i) => (
        <Accordion
          square
          expanded={expanded === `panel${i}`}
          onChange={handleChange(`panel${i}`)}
          key={`panel-report-${i}`}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>{column.title}</Typography>
          </AccordionSummary>
          <ListReport groupId={column.reportGroupId} onRowClick={onRowClick} />
        </Accordion>
      ))}
    </div>
  );
};

export default ConfigReport;
