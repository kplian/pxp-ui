/**
 * DrawForm Component for rendering the inputs from jsonConfig
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { Box, Button } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import StepContent from '@material-ui/core/StepContent';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Paper from '@material-ui/core/Paper';
import connection from 'pxp-client';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import InitValues from '../../hooks/InitValues';
import TextFieldPxp from './TextFieldPxp';
import TextFieldSelectPxp from './TextFieldSelectPxp';
import AutocompletePxp from './AutocompletePxp';
import KeyboardDatePickerPxp from './KeyboardDatePickerPxp';
import SwitchPxp from './SwitchPxp';
import LoadingScreen from '../LoadingScreen';
// @todo see the way for send the state in the handles only verify if it is correct and test

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

const DrawForm = forwardRef(
  ({ data, handlers, dialog, schema, schemaByGroup }, ref) => {
    const classes = useStyles();

    const { enqueueSnackbar } = useSnackbar();

    // separate json for button submit onSubmit
    const { onSubmit } = data;

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

    const [loadingScreen, setLoadingScreen] = useState(false);

    const resetForm = ({ states }) => {
      // eslint-disable-next-line no-unused-vars
      Object.entries(states).forEach(([nameKey, state]) => {
        state.setValue(state.initialValue);
      });
    };

    // this is for giving format to values for send to the backend
    const getValues = (states) => {
      const values = Object.entries(states).reduce(
        (t, [nameKey, state]) => ({
          ...t,
          ...(state.type === 'DatePicker' && {
            [nameKey]: moment(state.value).format(state.format),
          }),
          ...(state.type === 'AutoComplete' && {
            [nameKey]: (state.value && state.value[state.store.idDD]) || '',
          }),
          ...((state.type === 'Dropdown' ||
            state.type === 'TextField' ||
            state.type === 'Switch') && {
            [nameKey]: state.value,
          }),
        }),
        {},
      );
      return values;
    };

    // this factory is if exist some error then this  send to draw again the input with error or inputs
    const validateAllValues = (values, states) => {
      try {
        schema.validateSync(values, { abortEarly: false });
      } catch (errors) {
        errors.inner.forEach((error) => {
          states[error.path].setError({
            hasError: true,
            msg: error.message,
          });
        });
      }
    };

    const sendData = (values, states) => {
      setLoadingScreen(true);
      connection
        .doRequest({
          url: onSubmit.url,
          params: values,
        })
        .then((resp) => {
          if (!resp.error) {
            // need to reset the form
            resetForm({ states });
            enqueueSnackbar('Success', {
              variant: 'success',
              action: <Button>See all</Button>,
            });
            if (typeof onSubmit.callback === 'function') {
              onSubmit.callback();
            }
          } else {
            enqueueSnackbar(resp.detail.message, {
              variant: 'error',
              action: <Button>See all</Button>,
            });
          }
          setLoadingScreen(false);
        });
    };

    // logic for submit button
    const handleSubmitForm = (e, states) => {
      e.preventDefault();
      const values = {
        ...getValues(states),
        ...(onSubmit.extraParams && { ...onSubmit.extraParams }),
      };

      validateAllValues(values, states);

      schema.isValid(values).then((valid) => {
        if (valid) {
          // eslint-disable-next-line no-unused-expressions
          typeof onSubmit === 'function'
            ? onSubmit({ values, states })
            : sendData(values, states);
        }
      });
    };

    Object.entries(states).map(([nameKey, values], index) => {
      const groupName = values.group || Object.keys(groupsConfig)[0];
      // if hide is false then showing
      if (!values.hide) {
        if (values.type === 'TextField') {
          groupsConfig[groupName].children.push(
            <TextFieldPxp
              key={index}
              name={nameKey}
              value={values.value}
              configInput={values}
              handleChange={handlers.handleChange}
              memoDisabled={values.memoDisabled}
              error={values.error.hasError}
              msgError={values.error.msg}
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
              value={values.value}
              configInput={values}
              handleChange={handlers.handleChange}
              memoDisabled={values.memoDisabled}
              error={values.error.hasError}
              msgError={values.error.msg}
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
              value={values.value}
              configInput={values}
              handleChange={handlers.handleChange}
              loading={values.store.loading}
              memoDisabled={values.memoDisabled}
              states={states}
              open={values.store.open}
              disabled={values.disabled}
              helperText={values.helperText}
              error={values.error.hasError}
              msgError={values.error.msg}
            />,
          );
        }

        if (values.type === 'DatePicker') {
          groupsConfig[groupName].children.push(
            <KeyboardDatePickerPxp
              key={index}
              name={nameKey}
              value={values.value}
              configInput={values}
              handleChange={handlers.handleChange}
              memoDisabled={values.memoDisabled}
              error={values.error.hasError}
              states={states}
              disabled={values.disabled}
              helperText={values.helperText}
            />,
          );
        }
        if (values.type === 'Switch') {
          groupsConfig[groupName].children.push(
            <SwitchPxp
              key={index}
              name={nameKey}
              value={values.value}
              configInput={values}
              handleChange={handlers.handleChange}
              memoDisabled={values.memoDisabled}
              states={states}
              disabled={values.disabled}
            />,
          );
        }
      }

      return null;
    });

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = (group) => {
      const values = {
        ...getValues(states),
      };
      try {
        schemaByGroup[group].validateSync(values, { abortEarly: false });
      } catch (errors) {
        errors.inner.forEach((error) => {
          states[error.path].setError({
            hasError: true,
            msg: error.message,
          });
        });
      }
      schemaByGroup[group].isValid(values).then((valid) => {
        if (valid) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      });
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
      resetForm({ states });
      setActiveStep(0);
    };

    useImperativeHandle(ref, () => {
      return {
        states,
          handleSubmitForm
      };
    });

    return (
      <>
        {data.typeForm === 'normal' &&
          dialog &&
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
          })}

        {data.typeForm === 'normal' && !dialog && (
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
                            <Grid
                              key={`group_${nameKey}`}
                              container
                              spacing={2}
                            >
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

        {data.typeForm === 'normal' && (
          <Box
            mt={2}
            display="flex"
            justifyContent="flex-end"
            className={classes.root}
          >
            {data.resetButton && (
              <Button variant="outlined" onClick={() => resetForm({ states })}>
                Reset
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => handleSubmitForm(e, states)}
            >
              {data.submitLabel || 'Submit'}
            </Button>
          </Box>
        )}

        {data.typeForm === 'steppers' && (
          <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {states &&
                Object.entries(groupsConfig).map(([nameKey, values], index) => {
                  return (
                    <Step key={nameKey}>
                      {/* eslint-disable-next-line react/jsx-no-undef */}
                      <StepLabel>{values.titleGroup}</StepLabel>
                      <StepContent>
                        <Grid container spacing={3} key={`group_${index}`}>
                          {values.titleGroup !== '' && (
                            <>
                              <Grid item xs={12}>
                                <Typography
                                  variant="subtitle2"
                                  color="textSecondary"
                                >
                                  {values.titleGroup}
                                </Typography>
                              </Grid>
                            </>
                          )}
                          {values.children}
                        </Grid>

                        <div className={classes.actionsContainer}>
                          <div>
                            <Button
                              disabled={activeStep === 0}
                              onClick={handleBack}
                              className={classes.button}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleNext(nameKey)}
                              className={classes.button}
                            >
                              {activeStep ===
                              Object.values(groupsConfig).length - 1
                                ? 'Finish'
                                : 'Next'}
                            </Button>
                          </div>
                        </div>
                      </StepContent>
                    </Step>
                  );
                })}
            </Stepper>

            {activeStep === Object.values(groupsConfig).length && (
              // eslint-disable-next-line react/jsx-no-undef
              <Paper square elevation={0} className={classes.resetContainer}>
                <Typography>All steps completed</Typography>
                <Button
                  onClick={() => handleReset(states)}
                  className={classes.button}
                >
                  Reset
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => handleSubmitForm(e, states)}
                >
                  {data.submitLabel || 'Submit'}
                </Button>
              </Paper>
            )}
          </div>
        )}

        {loadingScreen && <LoadingScreen />}
      </>
    );
  },
);

export default DrawForm;
