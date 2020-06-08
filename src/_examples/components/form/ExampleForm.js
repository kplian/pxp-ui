/**
 * Examples Form
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
import React, { useRef } from 'react';
import * as Yup from 'yup';
import moment from 'moment';
import Form from '../../../_pxp/components/Form/Form';
import ButtonPxp from '../../../_pxp/components/ButtonPxp';
import IconPxp from '../../../_pxp/icons/IconPxp';
// import ExampleAutoComplete from './ExampleAutoComplete';
// import ExamplePicker from './ExamplePicker';
import BasicContainer from '../../../_pxp/containers/BasicContainer';

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

  const handleClickButton = () => {
    ref.current.states.ap_paterno.setValue('favio figueroa');
  };
  const handleClickSubmit = (e) => {
    ref.current.handleSubmitForm(e);
  };
  //   <ExamplePicker /> <ExampleAutoComplete />
  return (
    <BasicContainer>
      <Form data={jsonExample1} ref={ref} />

      <ButtonPxp icon={<IconPxp />} onClick={handleClickButton} />
      <ButtonPxp icon={<IconPxp />} onClick={handleClickSubmit} />
    </BasicContainer>
  );
};

export default ExampleForm;
