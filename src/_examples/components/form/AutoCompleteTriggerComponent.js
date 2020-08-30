/**
 * AutoCompleteTriggerComponent.js
 * @copyright Disydes 2020
 * @author Favio Figueroa
 */

import React, { useState } from 'react';
import _ from 'lodash';
import IconButton from '@material-ui/core/IconButton';
import * as Yup from 'yup';
import moment from 'moment';
import InitValues from '../../../_pxp/hooks/InitValues';
import { defaultValuesAutoComplete } from '../../../_pxp/components/Form/defaultValues';
import { handleMouseTriggerComponent } from '../../../_pxp/utils/Common';
import Warehouse1 from '../../../sales/icons/Warehouse1';
import AutocompletePxp from '../../../_pxp/components/Form/AutocompletePxp';
import DialogPxp from '../../../_pxp/components/DialogPxp';
import ManagerFile from '../../../_parameters/components/ManagerFile/ManagerFile';
import Form from '../../../_pxp/components/Form/Form';
import BasicContainer from '../../../_pxp/containers/BasicContainer';

const AutoCompleteTriggerComponent = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const jsonExample1 = {
    columns: {
      nombre: {
        type: 'TextField',
        validate: {
          shape: Yup.string().required('Required'),
        },
      },
      ap_paterno: {
        type: 'TextField',
        validate: {
          shape: Yup.string().required('Required'),
        },
      },
      ap_materno: {
        type: 'TextField',
        validate: {
          shape: Yup.string().required('Required'),
        },
      },
      correo: {
        type: 'TextField',
        validate: {
          shape: Yup.string().required('Required'),
        },
      },
      fecha_nacimiento: {
        type: 'DatePicker',
        label: 'Date',
        initialValue: moment(new Date()).toDate(),
        format: 'DD-MM-YYYY',
        form: false,
      },
      genero: {
        type: 'Dropdown',
        store: [
          { value: '', label: '' },
          { value: 'masculino', label: 'masculino' },
        ],
        validate: {
          shape: Yup.string().required('Required'),
        },
        form: true,
      },
      tipo_documento: {
        type: 'Dropdown',
        store: [
          { value: '', label: '' },
          { value: 'documento_identidad', label: 'pasaporte' },
        ],
        validate: {
          shape: Yup.string().required('Required'),
        },
        form: true,
      },
      ci: {
        type: 'TextField',
        validate: {
          shape: Yup.string().required('Required'),
        },
      },
      expedicion: {
        type: 'Dropdown',
        store: [
          { value: '', label: '' },
          { value: 'CB', label: 'LP' },
        ],
        validate: {
          shape: Yup.string().required('Required'),
        },
        form: true,
      },
    },
    onSubmit: {
      url: 'seguridad/Persona/guardarPersona',
      callback: (resp, dataForSending) => {
        console.log(resp);
        console.log(dataForSending);
        const values = {
          ...dataForSending,
          id_persona: resp.data.id_persona,
          value: resp.data.id_persona,
          nombre_completo2: `${dataForSending.nombre} ${dataForSending.ap_paterno} ${dataForSending.ap_materno}`,
        };
        console.log(values)
        autoCompleteConfig.setValue(values);
        setOpenDialog(false);
      },
      extraParams: {
        celular1: '',
        celular2: '',
        telefono1: '',
        telefono2: '',
        matricula: '',
        historia_clinica: '',
        direccion: '',
        fecha_nacimiento: '',
        grupo_sanguineo: '',
        abreviatura_titulo: '',
        profesion: '',
      },
    },
  };

  const handleClickShowComponent = () => {
    setOpenDialog(true);
  };

  const autoCompleteConfig = InitValues(
    _.merge({}, defaultValuesAutoComplete, {
      type: 'AutoComplete',
      label: 'Persona',
      initialValue: null,
      isSearchable: true,
      memoDisabled: true,
      variant: 'outlined',
      InputProps: {
        endAdornment: (
          <IconButton
            aria-label="toggle open form for adding new data"
            onClick={handleClickShowComponent}
            onMouseDown={handleMouseTriggerComponent}
          >
            <Warehouse1 />
          </IconButton>
        ),
      },
      helperText: 'Gerencias disponibles para tu usuario',
      store: {
        url: 'seguridad/Persona/listarPersona',
        params: {
          start: '0',
          limit: '50',
          sort: 'id_persona',
          dir: 'ASC',
        },
        parFilters: 'p.nombre_completo1#p.ci',
        idDD: 'id_persona',
        descDD: 'nombre_completo2',
        minChars: 2,
      },
    }),
  );

  const handleChange = ({ event, name, value, dataValue }) => {
    // eslint-disable-next-line no-unused-expressions
    event && event.preventDefault(); // in some inputs we dont have event like date pickers
    const stateField = autoCompleteConfig;
    const { setValue } = stateField;
    setValue(dataValue);
  };

  return (
    <>
      <AutocompletePxp
        key={1}
        name="funcionario"
        value={autoCompleteConfig.value}
        configInput={autoCompleteConfig}
        handleChange={handleChange}
        loading={autoCompleteConfig.store.loading}
        memoDisabled={autoCompleteConfig.memoDisabled}
        states={{}}
        open={autoCompleteConfig.store.open}
        disabled={autoCompleteConfig.disabled}
        helperText={autoCompleteConfig.helperText}
        error={autoCompleteConfig.error.hasError}
        msgError={autoCompleteConfig.error.msg}
        dataStore={autoCompleteConfig.store.data}
      />

      <DialogPxp
        titleToolbar="Formulario"
        onClose={() => {
          setOpenDialog(false);
        }}
        open={openDialog}
      >
        <Form data={jsonExample1} />
      </DialogPxp>
    </>
  );
};

export default AutoCompleteTriggerComponent;
