import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Scrollbars } from 'react-custom-scrollbars';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  master: {
    maxHeight: '60px !important',
    minHeight: '60px !important'
  }
}));

const MasterDetail = ({ children }) => {
  const classes = useStyles();
  const [masterExpanded, setMasterExpanded] = useState(true);
  const [detailExpanded, setDetailExpanded] = useState(true);

  console.log('[CHILDER]', children);
  const master = children[0];
  const detail = children[1];

  return (
    <div>
      {master}
      <h3>Detalle</h3>
      {detail}
      {
        //   <Accordion
        //   expanded={masterExpanded}
        //   onChange={() => setMasterExpanded(!masterExpanded)}
        // >
        //   <AccordionSummary
        //     expandIcon={<ExpandMoreIcon />}
        //     aria-controls="panel1a-content"
        //     id="panel1a-header"
        //   >
        //     <Typography className={classes.heading}>Maestro</Typography>
        //   </AccordionSummary>
        //   <AccordionDetails>
        //     <Scrollbars
        //       autoHide
        //       renderView={(props) => (
        //         <div
        //           {...props}
        //           style={{ ...props.style, overflowX: 'hidden', marginBottom: 0 }}
        //         />
        //       )}
        //       style={{
        //         maxHeight: '400px',
        //         minHeight: '400px',
        //       }}
        //     >
        //       {master}
        //     </Scrollbars>
        //   </AccordionDetails>
        // </Accordion>
        // <Accordion expanded={detailExpanded} onChange={() => setDetailExpanded(!detailExpanded)}>
        //   <AccordionSummary
        //     expandIcon={<ExpandMoreIcon />}
        //     aria-controls="panel2a-content"
        //     id="panel2a-header"
        //   >
        //     <Typography className={classes.heading}>Detalle</Typography>
        //   </AccordionSummary>
        //   <AccordionDetails>
        //     {detail}
        //   </AccordionDetails>
        // </Accordion>

      }
    </div>
  )
}

MasterDetail.propTypes = {

}

export default MasterDetail;
