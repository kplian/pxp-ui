/**
 * User form fields
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 * @todo add force password change in next login
 */
import * as Yup from 'yup';
import fm from './UserFieldMapping';
import am from '../../../_pxp/apiManager';

export default {
  [fm.person]: {
    type: 'AutoComplete',
    label: 'person',
    store: {
      url: am.segu.person.list,
      params: {
        start: '0',
        limit: '10',
        sort: fm.person,
        dir: 'ASC',
      },
      parFilters: `${fm.pCompleteName1}#${fm.nationalId}`,
      idDD: fm.person,
      descDD: fm.pCompleteName2,
      minChars: 2,
    },
    remote: true,
    gridForm: { xs: 12, sm: 12 },
    variant: 'outlined',
    validate: {
      shape: Yup.string().required('Required'),
    },
    group: 'groupPerson',
  },

  [fm.name]: {
    type: 'TextField',
    label: 'name',
    maxLength: 255,
    gridForm: { xs: 12, sm: 4 },
    variant: 'outlined',
    validate: {
      shape: Yup.string().required('Required'),
    },
    group: 'groupPerson',
  },
  [fm.surname1]: {
    type: 'TextField',
    label: 'surename1',
    initialValue: '',
    maxLength: 255,
    gridForm: { xs: 12, sm: 4 },
    variant: 'outlined',
    validate: {
      shape: Yup.string().required('Required'),
    },
    group: 'groupPerson',
  },
  [fm.surname2]: {
    type: 'TextField',
    label: 'surename2',
    initialValue: '',
    maxLength: 255,
    gridForm: { xs: 12, sm: 4 },
    variant: 'outlined',
    group: 'groupPerson',
  },
  [fm.email]: {
    type: 'TextField',
    label: 'email',
    initialValue: '',
    allowBlank: false,
    maxLength: 255,
    gridForm: { xs: 12, sm: 6 },
    variant: 'outlined',
    validate: {
      shape: Yup.string().email().required('Required'),
    },
    group: 'groupUser',
  },
  [fm.username]: {
    type: 'TextField',
    label: 'username',
    initialValue: '',
    allowBlank: false,
    maxLength: 255,
    gridForm: { xs: 12, sm: 6 },
    variant: 'outlined',
    validate: {
      shape: Yup.string()
        .min(5, 'Must be at least 7 characters')
        .max(20, 'Must be at least than 20 characters')
        .required('Required'),
    },
    group: 'groupUser',
  },
  [fm.expireDate]: {
    type: 'DatePicker',
    label: 'expireDate',
    format: 'DD-MM-YYYY',
    group: 'groupUser',
    validate: {
      shape: Yup.date().min(new Date(), 'validatePastDate'),
    },
  },
  [fm.resetPass]: {
    type: 'Switch',
    label: 'forgotPass',
    group: 'groupUser',
  },
};
