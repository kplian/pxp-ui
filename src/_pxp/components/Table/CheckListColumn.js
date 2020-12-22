/**
 * Component for rendering the options for showing or hide columns from config json for any pxp-ui project
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 *
 */
import React from 'react';
import { Box } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ViewColumn from '@material-ui/icons/ViewColumn';
import TolPop from '../TolPop';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

const CheckListColumn = ({ statesShowColumn, setStatesShowColumn, dataConfig }) => {
  const classes = useStyles();

  const handleChange = (event) => {
    setStatesShowColumn({
      ...statesShowColumn,
      [event.target.name]: event.target.checked,
    });
  };

  console.log('statesShowColumn',statesShowColumn)
  console.log('statesShowColumn',setStatesShowColumn)
  console.log('dataConfig',dataConfig)

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
