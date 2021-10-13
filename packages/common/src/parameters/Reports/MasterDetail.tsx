import React, { useState, FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
    minHeight: '60px !important',
  },
}));

const MasterDetail: FC<any> = ({ children }) => {
  const classes = useStyles();
  const [masterExpanded, setMasterExpanded] = useState(true);
  const [detailExpanded, setDetailExpanded] = useState(true);
  
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
  );
};

MasterDetail.propTypes = {};

export default MasterDetail;
