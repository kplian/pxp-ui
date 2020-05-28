/**
 * Examples Form
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
import React, { useRef } from 'react';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Form from '../../_pxp/components/Form/Form';
import ButtonPxp from '../../_pxp/components/ButtonPxp';
import IconPxp from '../../_pxp/icons/IconPxp';
import ExampleAutoComplete from '../../_pxp/components/Form/examples/ExampleAutoComplete';
import ExamplePicker from '../../_pxp/components/Form/examples/ExamplePicker';

const ExampleForm = () => {
  const ref = useRef();
  const jsonExample1 = {
    columns: {
      nombre: { type: 'TextField', group: 'groupUser' },
      ap_paterno: {
        type: 'TextField',
        validate: {
          shape: Yup.string().required('Required'),
        },
      },
      Checked: { type: 'Switch', initialValue: false },
      genero: {
        type: 'Dropdown',
        store: [
          { value: '', label: '' },
          { value: 'masculino', label: 'masculino' },
        ],
        validate: {
          shape: Yup.string().required('Required'),
        },
        form: false,
      },
      date: {
        type: 'DatePicker',
        label: 'Date',
        initialValue: moment(new Date()).toDate(),
        format: 'DD-MM-YYYY',
        form: false,
      },
      persona: {
        type: 'AutoComplete',
        label: 'Persona',
        initialValue: null,
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
        gridForm: { xs: 12, sm: 12 },
        variant: 'outlined',
        isSearchable: true,
        validate: {
          shape: Yup.string().required('Required'),
        },
        helperText: 'mensaje de ayuda',
        group: 'groupUser',
      },
    },
    groups: {
      groupPerson: {
        titleGroup: 'Persona',
        gridGroup: { xs: 12, sm: 6 },
      },
      groupUser: {
        titleGroup: 'Usuario',
        gridGroup: { xs: 12, sm: 6 },
      },
    },
    typeForm: 'steppers',
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
        initialValue: null,
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
        initialValue: moment(new Date()).toDate(),
        format: 'DD-MM-YYYY',
      },
    },
    resetButton: true,
    onSubmit: ({ values }) => {
      // we can send an handle for receiving data from form here
      console.log(values);
    },
  };

  const handleClickButton = () => {
    ref.current.states.ap_paterno.setValue('favio figueroa');
  };
  const handleClickSubmit = (e) => {
    ref.current.handleSubmitForm(e);
  };

  return (
    <>
      <PerfectScrollbar id="content">
        {' '}
        <ExamplePicker />
        <ExampleAutoComplete />
        <Form data={jsonExample1} ref={ref} />
        <ButtonPxp icon={<IconPxp />} onClick={handleClickButton} />
        <ButtonPxp icon={<IconPxp />} onClick={handleClickSubmit} />
        {/* <Form data={datePickers} />

      <Form data={jsonPersona} />
      <Form data={jsonConfig} /> */}
      </PerfectScrollbar>
    </>
  );
};

export default ExampleForm;
