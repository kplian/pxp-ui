/**
 * DrawForm Component for rendering the inputs from jsonConfig
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import * as Yup from 'yup';
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
import moment from 'moment';
import { useSnackbar } from 'notistack';
import InitValues from '../../hooks/InitValues';
import TextFieldPxp from './TextFieldPxp';
import TextFieldSelectPxp from './TextFieldSelectPxp';
import AutocompletePxp from './AutocompletePxp';
import KeyboardDatePickerPxp from './KeyboardDatePickerPxp';
import KeyboardTimePickerPxp from './KeyboardTimePickerPxp';
import SwitchPxp from './SwitchPxp';
import LoadingScreen from '../LoadingScreen';
import Pxp from '../../../Pxp';
import DropzoneAreaPxp from './DropzoneAreaPxp';
import GoogleReCaptchaPxpComponent from './GoogleReCaptcha';
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

const DrawForm = forwardRef(({ data, dialog }, ref) => {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  // separate json for button submit onSubmit
  const { onSubmit, onEnterSubmit } = data;

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

  const getSchemaValidation = (byGroup = false, callback) => {
    const getValidations = (nameGroup) => {
      const validations = Object.entries(states)
        // eslint-disable-next-line no-unused-vars
        .filter(
          // eslint-disable-next-line no-unused-vars
          ([nameKey, value]) =>
            typeof value.yupValidate === 'object' &&
            typeof value.yupValidate.shape === 'object' &&
            ((byGroup === true && value.group === nameGroup) ||
              byGroup === false) &&
            value.form &&
            !value.isHide,
        )
        .reduce(
          (t, [nameKey, value]) => ({
            ...t,
            [nameKey]: value.yupValidate.shape,
          }),
          {},
        );
      return validations;
    };
    if (byGroup) {
      const schema = {};
      Object.entries(data.groups).forEach(([nameGroup]) => {
        const schemaAux = Yup.object().shape(getValidations(nameGroup));
        schema[nameGroup] = schemaAux;
      });
      return callback(schema);
    }
    const schema = Yup.object().shape(getValidations());
    return callback(schema);
  };

  // todo listening changes in the states for hide
  /* Object.entries(states).forEach(([nameKey]) => {
    useEffect(() => {
      console.log('states', states[nameKey]);
    }, [states[nameKey].hide]);
  }); */

  const [loadingScreen, setLoadingScreen] = useState(false);

  const resetForm = () => {
    // eslint-disable-next-line no-unused-vars
    Object.entries(states).forEach(([nameKey, state]) => {
      state.reset();
    });
  };
  // hide group by name
  const hideGroup = (nameGroup) => {
    Object.values(states)
      .filter((value) => value.group === nameGroup)
      .forEach((field) => {
        field.hide();
      });
  };
  const showGroup = (nameGroup) => {
    Object.values(states)
      .filter((value) => value.group === nameGroup)
      .forEach((field) => {
        field.show();
      });
  };
  const eventsForm = { hideGroup, showGroup };

  const handleChange = ({ event, name, value, dataValue }) => {
    // eslint-disable-next-line no-unused-expressions
    event && event.preventDefault(); // in some inputs we dont have event like date pickers
    const stateField = states[name];
    const { setValue } = stateField;

    const valueOfType = stateField.type === 'AutoComplete' ? dataValue : value;

    setValue(valueOfType);

    if (stateField.onChange) {
      stateField.onChange({
        event,
        value,
        dataValue,
        stateField,
        states,
        eventsForm,
      });
    }
  };
  const handleBlur = (name) => {
    const field = states[name];
    if (field.yupValidate) {
      const schemaOnlyField = Yup.object().shape({
        [name]: states[name].yupValidate.shape,
      });
      schemaOnlyField
        .validateAt(name, { [name]: field.value })
        .then(() => {
          field.setError({ hasError: false, msg: '' });
        })
        .catch((err) => {
          field.setError({ hasError: true, msg: err.message });
        });
    }
  };

  // this is for giving format to values for send to the backend
  const getValues = () => {
    const values = Object.entries(states).reduce(
      (t, [nameKey, state]) => ({
        ...t,
        ...(state.type === 'DatePicker' && {
          [nameKey]: moment(state.value).format(state.format),
        }),
        ...(state.type === 'TimePicker' && {
          [nameKey]: moment(state.value).format(state.format),
        }),
        ...(state.type === 'AutoComplete' && {
          [nameKey]: (state.value && state.value[state.store.idDD]) || '',
        }),
        ...((state.type === 'Dropdown' ||
          state.type === 'TextField' ||
          state.type === 'DropzoneArea' ||
          state.type === 'GoogleReCaptcha' ||
          state.type === 'Switch') && {
          [nameKey]: state.value,
        }),
      }),
      {},
    );
    return values;
  };

  // this factory is if exist some error then this  send to draw again the input with error or inputs
  const validateAllValues = (schema, values) => {
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

  const getDataForSending = (values, callback) => {
    let dataForSending;
    let type;
    const thereIsDropZoneArea = Object.entries(states).find(
      ([nameKey, value]) => value.type === 'DropzoneArea',
    );
    if (thereIsDropZoneArea) {
      const formData = new FormData();
      Object.entries(values).forEach(([nameKey, value]) => {
        if (states[nameKey]) {
          // only the input in state , no extraParams
          if (states[nameKey].type === 'DropzoneArea') {
            for (let i = 0; i < value.length; i++) {
              // formData.append(`${nameKey}[]`, value[i]);
              formData.append(nameKey, value[i]);
            }
          } else {
            formData.append(nameKey, value);
          }
        } else {
          formData.append(nameKey, value); // added extraParams
        }
      });
      dataForSending = formData;
      type = 'upload';
    } else {
      dataForSending = values;
    }
    callback(dataForSending, type);
  };
  const sendData = (values) => {
    setLoadingScreen(true);

    getDataForSending(values, (dataForSending, type) => {
      Pxp.apiClient
        .doRequest({
          url: onSubmit.url,
          params: dataForSending,
          ...(type && { type }),
        })
        .then((resp) => {
          if (!resp.error) {
            // need to reset the form
            // eslint-disable-next-line no-unused-expressions
            onSubmit.resetForm !== false && resetForm();
            enqueueSnackbar('Success', {
              variant: 'success',
              action: <Button>See all</Button>,
            });
            if (typeof onSubmit.callback === 'function') {
              onSubmit.callback(resp);
            }
          } else {
            enqueueSnackbar(resp.detail.message, {
              variant: 'error',
              action: <Button>See all</Button>,
            });
          }
          setLoadingScreen(false);
        });
    });
  };

  // logic for submit button
  const handleSubmitForm = (e) => {
    e.preventDefault();

    const values = {
      ...getValues(),
      ...(onSubmit.extraParams && { ...onSubmit.extraParams }),
    };

    getSchemaValidation(false, (schema) => {
      validateAllValues(schema, values);

      schema.isValid(values).then((valid) => {
        if (valid) {
          // eslint-disable-next-line no-unused-expressions
          typeof onSubmit === 'function'
            ? onSubmit({ values, states })
            : sendData(values);
        }
      });
    });
  };

  if (onEnterSubmit) {
    const handleUserKeyPress = (event) => {
      const { keyCode } = event;
      if (onEnterSubmit && keyCode === 13) {
        handleSubmitForm(event);
      }
    };

    useEffect(() => {
      window.addEventListener('keydown', handleUserKeyPress);
      return () => {
        window.removeEventListener('keydown', handleUserKeyPress);
      };
    }, [states, handleUserKeyPress]);
  }

  Object.entries(states).map(([nameKey, values], index) => {
    const groupName = values.group || Object.keys(groupsConfig)[0];

    // if hide is false then showing and the flag form is true
    if (!values.isHide && values.form) {
      if (values.type === 'TextField') {
        groupsConfig[groupName].children.push(
          <TextFieldPxp
            key={index}
            name={nameKey}
            value={values.value}
            configInput={values}
            handleChange={handleChange}
            handleBlur={handleBlur}
            memoDisabled={values.memoDisabled}
            error={values.error.hasError}
            msgError={values.error.msg}
            states={states}
            disabled={values.disabled}
            helperText={values.helperText}
            inputProps={values.inputProps}
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
            handleChange={handleChange}
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
            handleChange={handleChange}
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
            handleChange={handleChange}
            memoDisabled={values.memoDisabled}
            error={values.error.hasError}
            states={states}
            disabled={values.disabled}
            helperText={values.helperText}
          />,
        );
      }
      if (values.type === 'TimePicker') {
        groupsConfig[groupName].children.push(
          <KeyboardTimePickerPxp
            key={index}
            name={nameKey}
            value={values.value}
            configInput={values}
            handleChange={handleChange}
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
            handleChange={handleChange}
            memoDisabled={values.memoDisabled}
            states={states}
            disabled={values.disabled}
          />,
        );
      }
      if (values.type === 'DropzoneArea') {
        groupsConfig[groupName].children.push(
          <DropzoneAreaPxp
            key={index}
            name={nameKey}
            value={values.value}
            configInput={values}
            handleChange={handleChange}
            memoDisabled={values.memoDisabled}
            error={values.error.hasError}
            msgError={values.error.msg}
            states={states}
            disabled={values.disabled}
            propsDropZoneArea={values.propsDropZoneArea}
          />,
        );
      }
      if (values.type === 'GoogleReCaptcha') {
        groupsConfig[groupName].children.push(
          <GoogleReCaptchaPxpComponent
            key={index}
            name={nameKey}
            sitekey={values.sitekey}
            ref={values.ref}
            configInput={values}
            handleChange={handleChange}
            memoDisabled={values.memoDisabled}
            error={values.error.hasError}
            msgError={values.error.msg}
            states={states}
            disabled={values.disabled}
            propsDropZoneArea={values.propsDropZoneArea}
          />,
        );
      }
    }

    return null;
  });

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = async (group) => {
    const values = {
      ...getValues(),
    };

    getSchemaValidation(true, (shema) => {
      try {
        shema[group].validateSync(values, { abortEarly: false });
      } catch (errors) {
        errors.inner.forEach((error) => {
          states[error.path].setError({
            hasError: true,
            msg: error.message,
          });
        });
      }

      shema[group].isValid(values).then((valid) => {
        if (valid) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      });
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    resetForm();
    setActiveStep(0);
  };

  const addExtraParam = (name, value) => {
    onSubmit.extraParams[name] = value;
  };

  const removeExtraParam = (name) => {
    delete onSubmit.extraParams[name];
  };

  useImperativeHandle(ref, () => {
    return {
      states,
      handleSubmitForm,
      addExtraParam,
      removeExtraParam,
      hideGroup,
      showGroup,
    };
  });

  return (
    <>
      {data.typeForm === 'normal' &&
        dialog &&
        Object.entries(groupsConfig).map(([nameKey, values], index) => {
          const continueRenderGroup = Object.values(states).filter(
            (value) => value.group === nameKey && !value.isHide,
          );
          if (continueRenderGroup.length === 0) {
            return '';
          }
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
              const continueRenderGroup = Object.values(states).filter(
                (value) => value.group === nameKey && !value.isHide,
              );
              if (continueRenderGroup.length === 0) {
                return '';
              }
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

      {data.typeForm === 'normal' && (
        <Box
          mt={2}
          display="flex"
          justifyContent="flex-end"
          className={classes.root}
        >
          {data.resetButton && (
            <Button variant="outlined" onClick={() => resetForm()}>
              Reset
            </Button>
          )}
          {(data.submitButton === true || data.submitButton === undefined) && (
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => handleSubmitForm(e)}
            >
              {data.submitLabel || 'Submit'}
            </Button>
          )}
        </Box>
      )}

      {data.typeForm === 'steppers' && (
        <div className={classes.root}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {states &&
              Object.entries(groupsConfig).map(([nameKey, values], index) => {
                // const continueRenderGroup = Object.values(states).filter((value) => (value.group === nameKey && !value.isHide));
                // todo for continue render Group when the form is steppers
                return (
                  <Step key={nameKey}>
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    <StepLabel>{values.titleGroup}</StepLabel>
                    <StepContent>
                      <Grid container spacing={3} key={`group_${index}`}>
                        {values.descGroup && (
                          <>
                            <Grid item xs={12}>
                              <Typography
                                variant="subtitle2"
                                color="textSecondary"
                              >
                                {values.descGroup}
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
                            {data.steppersConfig &&
                            data.steppersConfig.backButton
                              ? data.steppersConfig.backButton
                              : 'Back'}
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleNext(nameKey)}
                            className={classes.button}
                          >
                            {activeStep ===
                            Object.values(groupsConfig).length - 1
                              ? data.steppersConfig &&
                                data.steppersConfig.finishButton
                                ? data.steppersConfig.finishButton
                                : 'Finish'
                              : data.steppersConfig &&
                                data.steppersConfig.nextButton
                              ? data.steppersConfig.nextButton
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
              <Typography>
                {data.steppersConfig && data.steppersConfig.stepsCompleted
                  ? data.steppersConfig.stepsCompleted
                  : 'All steps completed'}
              </Typography>
              <Button
                onClick={() => handleReset(states)}
                className={classes.button}
              >
                Reset
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={(e) => handleSubmitForm(e)}
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
});

export default DrawForm;
