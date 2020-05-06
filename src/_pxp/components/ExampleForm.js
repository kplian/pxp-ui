import React from 'react';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import moment from 'moment';
import Form from './Form/Form';

const ExampleForm = () => {

  const jsonExample1 = {
    columns: {
      nombre: { type: 'TextField' },
      ap_paterno: { type: 'TextField' },
      genero: {
        type: 'Dropdown',
        store: [
          { value: '', label: '' },
          { value: 'masculino', label: 'masculino' },
        ],
      },
      date: {
        type: 'DatePicker',
        label: 'Date',
        initialValue: moment(new Date()).toDate(),
        format: 'DD-MM-YYYY',
      },
      persona: {
        type: 'AutoComplete',
        label: 'Persona',
        initialValue: '',
        store: {
          url: 'seguridad/Persona/listarPersona',
          params: {
            start: '0',
            limit: '10',
            sort: 'id_persona',
            dir: 'ASC',
          },
          parFilters: 'p.nombre_completo1#p.ci',
          idDD: 'id_persona',
          descDD: 'nombre_completo2',
          minChars: 2,
        },
        remote: true,
        gridForm: { xs: 12, sm: 6 },
        variant: 'outlined',
        isSearchable: false,
        validate: {
          shape: Yup.string().required('Required'),
        },
        helperText: 'mensaje de ayuda',
      },
    },
  };

  const jsonPersona = {
    nameForm: 'Formulario Persona',
    columns: {
      nombre: {
        type: 'TextField',
        typeTextField: 'password',
        label: 'Nombre',
        initialValue: '',
        maxLength: 255,
        gridForm: { xs: 12, sm: 4 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Required'),
        },
        helperText: 'mensaje de ayuda',
      },
      ap_paterno: {
        type: 'TextField',
        label: 'Apellido Paterno',
        initialValue: '',
        maxLength: 255,
        gridForm: { xs: 12, sm: 4 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Required'),
        },
      },
      ap_materno: {
        type: 'TextField',
        label: 'Apellido Materno',
        initialValue: '',
        maxLength: 255,
        gridForm: { xs: 12, sm: 4 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Required'),
        },
      },
      ci: {
        type: 'TextField',
        label: 'CI',
        initialValue: '',
        maxLength: 255,
        gridForm: { xs: 12, sm: 6 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Required'),
        },
      },
      genero: {
        type: 'Dropdown',
        label: 'Genero',
        initialValue: '',
        store: [
          { value: '', label: '' },
          { value: 'masculino', label: 'masculino' },
          {
            value: 'femenino',
            label: 'femenino',
          },
        ],
        gridForm: { xs: 12, sm: 6 },
        variant: 'outlined',
      },

      tipo_documento: {
        type: 'Dropdown',
        label: 'Tipo Documento',
        initialValue: '',
        store: [
          { value: '', label: '' },
          {
            value: 'documento_identidad',
            label: 'documento_identidad',
          },
          { value: 'pasaporte', label: 'pasaporte' },
        ],
        gridForm: { xs: 12, sm: 6 },
        variant: 'outlined',
      },
      expedicion: {
        type: 'Dropdown',
        label: 'Expedido',
        initialValue: '',
        store: [
          { value: '', label: '' },
          { value: 'CB', label: 'CB' },
          { value: 'LP', label: 'LP' },
          { value: 'BN', label: 'BN' },
        ],
        gridForm: { xs: 12, sm: 6 },
        variant: 'outlined',
      },
    },
    resetButton: true,
    onSubmit: {
      url: 'seguridad/Persona/guardarPersona',
      extraParams: {
        correo: '',
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
      // todo need to add typeSend for change to send all in jsonFormat or normal pxp
    },
  };

  const jsonConfig = {
    nameForm: 'Formulario Usuario',
    columns: {
      email: {
        type: 'TextField',
        label: 'Email',
        initialValue: '',
        maxLength: 255,
        gridForm: { xs: 12, sm: 6 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().email().required('Required'),
        },
      },
      name: {
        type: 'TextField',
        label: 'Name',
        initialValue: '',
        maxLength: 255,
        gridForm: { xs: 12, sm: 6 },
        variant: 'outlined',
        validate: {
          shape: Yup.string()
            .min(7, 'Must be at least 7 characters')
            .max(10, 'muchos')
            .required('Required'),
        },
      },
      persona: {
        type: 'AutoComplete',
        label: 'Persona',
        initialValue: '',
        store: {
          url: 'seguridad/Persona/listarPersona',
          params: {
            start: '0',
            limit: '10',
            sort: 'id_persona',
            dir: 'ASC',
          },
          parFilters: 'p.nombre_completo1#p.ci',
          idDD: 'id_persona',
          descDD: 'nombre_completo2',
          minChars: 2,
          renderOption: (option) => (
            <Grid item container alignItems="center" xs={12}>
              <Grid item xs={12}>
                <b>Nombre Completo </b> {option.nombre_completo2}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="textPrimary">
                  <b>CI: </b> {option.ci}
                </Typography>
              </Grid>
            </Grid>
          ),
        },
        remote: true,
        gridForm: { xs: 12, sm: 6 },
        variant: 'outlined',
        isSearchable: true,
        validate: {
          shape: Yup.string().required('Required'),
        },
        helperText: 'mensaje de ayuda',
      },
      data_person: {
        type: 'TextField',
        label: 'Data Person',
        initialValue: '',
        maxLength: 255,
        gridForm: { xs: 12, sm: 6 },
        variant: 'outlined',
      },
    },
    onSubmit: {
      url: 'seguridad/Persona/insertarPersona',
      extraParams: { a: '1', b: '2' },
      // todo need to add typeSend for change to send all in jsonFormat or normal pxp
    },
  };

  const datePickers = {
    nameForm: 'Formulario Datepickers',
    columns: {
      date: {
        type: 'DatePicker',
        label: 'Date',
        initialValue: '22-05-2020',
        minDate: '01-05-2020',
        maxDate: '05-06-2020',
        format: 'DD-MM-YYYY',
        gridForm: { xs: 12, sm: 6 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Required'),
        },
        helperText: 'mensaje de ayuda',
      },
    },
    resetButton: true,
    onSubmit: ({ values }) => {
      // we can send an handle for receiving data from form here
      console.log(values);
    },
  };

  return (
    <>
      <Form data={jsonExample1} />
      {/*      <Form data={jsonPersona} />
      <Form data={jsonConfig} />
      <Form data={datePickers} /> */}
    </>
  );
};

export default ExampleForm;
