import React, { useState } from 'react';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import Form from '../../../_pxp/components/Form/Form';
import MasterDetailContainer from '../../../_pxp/containers/MasterDetailContainer';
import api from '../../../_pxp/apiManager';
import config from '../../../config';

const PersonForm = () => {
  const { t } = useTranslation('segu_user');
  const isV1 = config.backendRestVersion === 'v1';
  const name = isV1 ? 'nombre' : 'name';
  const jsonPersona = {
    nameForm: 'Formulario Persona',
    columns: {
      [name]: {
        type: 'TextField',
        label: 'name',
        initialValue: '',
        allowBlank: false,
        maxLength: 255,
        gridForm: { xs: 12, sm: 4 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Required'),
        },
      },
      ap_paterno: {
        type: 'TextField',
        label: t('flastname'),
        initialValue: '',
        allowBlank: false,
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
        allowBlank: false,
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
        allowBlank: false,
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
    onSave: {
      url: api.segu.user.update,
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
    translationNS: '',
    columns: {
      email: {
        type: 'TextField',
        label: 'Email',
        initialValue: '',
        allowBlank: false,
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
        allowBlank: false,
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
      },
      data_person: {
        type: 'TextField',
        label: 'Data Person',
        initialValue: '',
        allowBlank: false,
        maxLength: 255,
        gridForm: { xs: 12, sm: 6 },
        variant: 'outlined',
      },
    },
    onSave: {
      url: api.segu.person.update,
      extraParams: { a: '1', b: '2' },
      // todo need to add typeSend for change to send all in jsonFormat or normal pxp
    },
  };
  const [openDetail, setOpenDetail] = useState(false);
  const onShowDetail = () => {
    alert('show detail');
    setOpenDetail(true);
  };

  const onCloseDetail = () => {
    alert('close detail');
    setOpenDetail(false);
  };

  return (
    <div>
      <MasterDetailContainer
        master={<Form data={jsonPersona} />}
        detail={<Form data={jsonConfig} />}
        orientation="vertical"
        openDetail={openDetail}
        onCloseDetail={onCloseDetail}
      />
      <button onClick={onShowDetail}>detail</button>
    </div>
  );
};

export default PersonForm;
