/**
 * Example for each cases of AutoComplete
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
import React from 'react';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { simpleForm, configAutoComplete, configTextField } from './config';
import Form from '../../../_pxp/components/Form/Form';
import imgAvatar from '../../../_pxp/components/Table/avatar.jpeg';
import Label from '../../../_pxp/components/Label';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1),
  },
}));

const ExampleAutoComplete = () => {
  const classes = useStyles();
  const valueDefault = {
    id_persona: '1231111',
    label: 'ADMINISTRADOR DEL SISTEMA ',
    nombre: 'ADMINISTRADOR',
    nombre_completo1: 'ADMINISTRADOR DEL SISTEMA ',
    nombre_completo2: 'ADMINISTRADOR DEL SISTEMA ',
    num_documento: null,
    telefono1: null,
    telefono2: null,
    tipo_documento: null,
    value: '1231111',
  };
  const config = {
    ...simpleForm,
    columns: {
      AutoComplete1: {
        ...configAutoComplete,
        helperText:
          'this AutoComplete Only get 1 time the Data (isSearchable = false)',
      },
      AutoComplete2: {
        ...configAutoComplete,
        label: 'AutoComplete2',
        isSearchable: true,
        helperText:
          'this AutoComplete is refreshed for each press key with an debounce of 500ms (isSearchable = true), you need to setup "store.parFilters: \'alias.column1#alias.column2\'" ',
      },
      AutoComplete3: {
        ...configAutoComplete,
        label: 'AutoComplete3',
        validate: {
          shape: Yup.string().required('Required'),
        },
        helperText:
          'this AutoComplete Valid if it is empty (validate : { shape: Yup ) -> press Submit',
        group: 'validateGroup',
      },
      AutoComplete4: {
        ...configAutoComplete,
        label: 'AutoComplete4',
        store: {
          ...configAutoComplete.store,
          renderOption: (option) => (
            <Grid item container alignItems="center" xs={12}>
              <Grid item xs={12}>
                <b>Name:</b> {option.nombre_completo2}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="textPrimary">
                  <b>CI: </b> {option.ci}
                </Typography>
              </Grid>
            </Grid>
          ),
        },
        helperText: 'Render Option (1)',
        group: 'renderOptionGroup',
      },
      AutoComplete5: {
        ...configAutoComplete,
        label: 'AutoComplete5',
        store: {
          ...configAutoComplete.store,
          renderOption: (option) => (
            <Box display="flex" alignItems="center">
              <Avatar className={classes.avatar} src={imgAvatar} />
              <div>
                <Typography variant="body2" color="inherit">
                  <b>Nombre:</b>
                  {option.nombre_completo2}
                </Typography>
                <Label color="success">
                  <b>Ci:</b>
                  {option.ci}
                </Label>
              </div>
            </Box>
          ),
        },
        helperText: 'Render Option (2) with Avatar and classes',
        group: 'renderOptionGroup',
      },
      AutoComplete6: {
        ...configAutoComplete,
        label: 'AutoComplete6 Disable',
        helperText: 'this AutoComplete is disabled',
        group: 'disableHideGroup',
        disabled: true,
      },
      AutoComplete7: {
        // you can not see this autocomplete in the form
        ...configAutoComplete,
        label: 'AutoComplete7 Hide',
        helperText: 'this AutoComplete is hidden',
        group: 'disableHideGroup',
        hide: true,
      },
      AutoComplete8: {
        ...configAutoComplete,
        label: 'AutoComplete8 OnChange',
        helperText:
          'if you want to do some action in another fields (you need to overwrite the onChange)',
        group: 'overwriteOnChange',
        onChange: ({ value, dataValue, configInputState, states }) => {
          // value is the value selected
          // dataValue is the data store
          // configInputState is the state of the Autocomplete 8
          // states is all states of this form
          // disabled AutoComplete9
          console.log(dataValue);
          states.AutoComplete9.setDisabled(true);
          // populate data to name (textfield)
          if (value !== '') {
            states.name.setValue(dataValue.nombre_completo2);
          } else {
            states.name.setValue('');
          }
          states.AutoComplete9.setError({ hasError: true, msg: 'tiene error' });
          states.AutoComplete3.setHide(true);

          // add filter to store to AutoComplete user
          states.AutoComplete10.store.set({
            ...states.AutoComplete10.store.state,
            params: {
              ...states.AutoComplete10.store.state.params,
              id_persona: value, // added the id_persona to params
            },
          });
        },
      },
      AutoComplete9: {
        ...configAutoComplete,
        label: 'AutoComplete9 for disabled',
        helperText:
          'this AutoComplete will be disable when selected Autocomplete 8',
        group: 'overwriteOnChange',
      },
      name: {
        ...configTextField,
        label: 'TexField Aux',
        helperText:
          'This Texfield will populate with data when Autocomplete 8 is selected',
        group: 'overwriteOnChange',
      },
      AutoComplete10: {
        ...configAutoComplete,
        label: 'AutoComplete10',
        helperText:
          'this AutoComplete will add a id_persona parameter from AutoComplete 8',
        group: 'overwriteOnChange',
      },
      AutoComplete11: {
        ...configAutoComplete,
        label: 'AutoComplete11',
        helperText:
          'this AutoComplete will add a id_persona parameter from AutoComplete 8',
        group: 'overwriteOnChange',
      },
      AutoComplete12: {
        ...configAutoComplete,
        label: 'AutoComplete12',
        initialValue: valueDefault,
        helperText:
          'this AutoComplete has default value, you need to send the object for showing',
        group: 'defaultValueGroup',
      },
    },
    groups: {
      isSearchableGroup: {
        titleGroup: 'Is Searchable',
        gridGroup: { xs: 12, sm: 12 },
      },
      validateGroup: {
        titleGroup: 'Validate',
        gridGroup: { xs: 12, sm: 12 },
      },
      renderOptionGroup: {
        titleGroup: 'Render Option',
        gridGroup: { xs: 12, sm: 12 },
      },
      disableHideGroup: {
        titleGroup: 'Disable and Hide',
        gridGroup: { xs: 12, sm: 12 },
      },
      overwriteOnChange: {
        titleGroup: 'overwrite the onChange',
        gridGroup: { xs: 12, sm: 12 },
      },
      defaultValueGroup: {
        titleGroup: 'Default Value',
        gridGroup: { xs: 12, sm: 12 },
      },
    },
  };
  return <Form data={config} />;
};

export default ExampleAutoComplete;
