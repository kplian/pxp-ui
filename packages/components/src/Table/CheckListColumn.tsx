/* eslint-disable no-nested-ternary */
/**
 * Component for rendering the options for showing or hide columns from config json for any pxp-ui project
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 *
 */
import React from 'react';
import { Box } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import makeStyles from '@mui/styles/makeStyles';
import ViewColumn from '@mui/icons-material/ViewColumn';
import TolPop from '../TolPop';
import { Theme } from '@mui/material';

const useStyles: any = makeStyles((theme:Theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

const CheckListColumn = ({
  statesShowColumn,
  setStatesShowColumn,
  dataConfig,
}) => {
  const classes = useStyles();

  const handleChange = (event) => {
    setStatesShowColumn({
      ...statesShowColumn,
      [event.target.name]: event.target.checked,
    });
  };

  // console.log('statesShowColumn',statesShowColumn)
  // console.log('statesShowColumn',setStatesShowColumn)
  // console.log('dataConfig',dataConfig)

  return (
    <>
      <TolPop icon={<ViewColumn />}>
        <Box>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Show Columns</FormLabel>
            <FormGroup>
              {Object.entries(statesShowColumn).map(([nameKey], index) => (
                <FormControlLabel
                  key={`checklist_${nameKey}`}
                  control={
                    <Checkbox
                      checked={statesShowColumn[nameKey]}
                      onChange={handleChange}
                      name={nameKey}
                    />
                  }
                  label={
                    index > 0
                      ? dataConfig.columns[nameKey]
                        ? dataConfig.columns[nameKey].label
                        : ''
                      : nameKey
                  }
                />
              ))}
            </FormGroup>
          </FormControl>
        </Box>
      </TolPop>
    </>
  );
};

export default CheckListColumn;
