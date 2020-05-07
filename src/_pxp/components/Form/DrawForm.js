/**
 * DrawForm Component for rendering the inputs from jsonConfig
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Box, Button } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import InitValues from '../../hooks/InitValues';
import TextFieldPxp from './TextFieldPxp';
import TextFieldSelectPxp from './TextFieldSelectPxp';
import AutocompletePxp from './AutocompletePxp';
import KeyboardDatePickerPxp from './KeyboardDatePickerPxp';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const DrawForm = ({ data, handlers, dialog }) => {
  // init the groups
  const groupsConfig = Object.entries(data.groups).reduce(
    (t, [nameKey, values]) => ({
      ...t,
      [nameKey]: { ...values, children: [] },
    }),
    {},
  );

  // init the draw and the states
  const states = Object.entries(data.columns).reduce(
    (t, [nameKey, value]) => ({
      ...t,
      [nameKey]: {
        ...InitValues(value),
        memoDisabled: !value.onChange,
      },
    }),
    {},
  );

  const classes = useStyles();

  Object.entries(states).map(([nameKey, values], index) => {
    const groupName = values.group || Object.keys(groupsConfig)[0];
    if (values.type === 'TextField') {
      groupsConfig[groupName].children.push(
        <TextFieldPxp
          key={index}
          name={nameKey}
          value={values._value.value}
          configInput={values}
          handleChange={handlers.handleChange}
          memoDisabled={values.memoDisabled}
          error={values.validate.error.error.error}
          states={states}
          disabled={values.disabled}
          helperText={values.helperText}
        />,
      );
    }

    if (values.type === 'Dropdown') {
      groupsConfig[groupName].children.push(
        <TextFieldSelectPxp
          key={index}
          name={nameKey}
          value={values._value.value}
          configInput={values}
          handleChange={handlers.handleChange}
          memoDisabled={values.memoDisabled}
          error={values.validate.error.error.error}
          states={states}
          disabled={values.disabled}
          helperText={values.helperText}
        />,
      );
    }

    if (values.type === 'AutoComplete') {
      groupsConfig[groupName].children.push(
        <AutocompletePxp
          key={index}
          name={nameKey}
          value={values._value.value}
          configInput={values}
          handleChange={handlers.handleChange}
          loading={values.store.loading}
          memoDisabled={values.memoDisabled}
          states={states}
          open={values.store.open}
          disabled={values.disabled}
          helperText={values.helperText}
        />,
      );
    }

    if (values.type === 'DatePicker') {
      groupsConfig[groupName].children.push(
        <KeyboardDatePickerPxp
          key={index}
          name={nameKey}
          value={values._value.value}
          configInput={values}
          handleChange={handlers.handleChange}
          memoDisabled={values.memoDisabled}
          error={values.validate.error.error.error}
          states={states}
          disabled={values.disabled}
          helperText={values.helperText}
        />,
      );
    }
    return null;
  });

  return (
    <>
      {dialog ? (
        Object.entries(groupsConfig).map(([nameKey, values], index) => {
          return (
            <Grid container spacing={3} key={`group_${index}`}>
              {values.titleGroup !== '' && (
                <>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="textSecondary">
                      {values.titleGroup}
                    </Typography>
                  </Grid>
                </>
              )}
              {values.children}
            </Grid>
          );
        })
      ) : (
        <Grid container spacing={3}>
          {states &&
            Object.entries(groupsConfig).map(([nameKey, values], index) => {
              return (
                <React.Fragment key={`group_${index}`}>
                  <Grid item {...values.gridGroup}>
                    <Box>
                      <Card>
                        <CardHeader
                          title={
                            values.titleGroup
                              ? values.titleGroup
                              : data.nameForm
                          }
                        />
                        <Divider />
                        <CardContent>
                          <Grid key={`group_${nameKey}`} container spacing={2}>
                            {values.children}
                          </Grid>
                        </CardContent>
                      </Card>
                    </Box>
                  </Grid>
                </React.Fragment>
              );
            })}
        </Grid>
      )}

      <Box
        mt={2}
        display="flex"
        justifyContent="flex-end"
        className={classes.root}
      >
        {data.resetButton && (
          <Button
            variant="outlined"
            onClick={() => handlers.resetForm({ states })}
          >
            Reset
          </Button>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => handlers.handleSubmitForm(e, states)}
        >
          {data.submitLabel || 'Submit'}
        </Button>
      </Box>
    </>
  );
};

export default DrawForm;
