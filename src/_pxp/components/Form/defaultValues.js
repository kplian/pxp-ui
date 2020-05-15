/**
 * Default values for each component of Form Pxp
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 *
 */
export const defaultConfig = {
  nameForm: 'NameForm',
  columns: {},
  resetButton: true,
  submitLabel: 'Submit',
  onSubmit: {
    url: 'changeSystem/changeControl/changeMethod',
    extraParams: {},
  },
  groups: {
    group1: {
      titleGroup: '',
      gridGroup: { xs: 12, sm: 12 },
    },
  },
  typeForm: 'normal', // can be steppers (type wizard)
};
export const defaultValuesTextField = {
  type: 'TextField',
  label: undefined,
  initialValue: '',
  maxLength: 255,
  gridForm: { xs: 12, sm: 12 },
  variant: 'outlined',
  validate: undefined,
  helperText: undefined,
  disabled: undefined,
  hide: undefined,
  group: undefined, // the default group ever is group1 or the first position in the object of the groups
};
export const defaultValuesSwitch = {
  type: 'Switch',
  label: undefined,
  initialValue: false,
  maxLength: 255,
  gridForm: { xs: 12, sm: 12 },
  variant: 'outlined',
  validate: undefined,
  disabled: undefined,
  hide: undefined,
  group: undefined, // the default group ever is group1 or the first position in the object of the groups
};
export const defaultValuesDropdown = {
  type: 'Dropdown',
  label: undefined,
  initialValue: '',
  store: [{ value: '', label: '' }],
  gridForm: { xs: 12, sm: 12 },
  variant: 'outlined',
  validate: undefined,
  helperText: undefined,
  disabled: undefined,
  hide: undefined,
  group: undefined, // the default group ever is group1 or the first position in the object of the groups
};
export const defaultValuesAutoComplete = {
  type: 'AutoComplete',
  label: undefined,
  initialValue: null,
  store: {
    url: 'system/Control/Method',
    params: {
      start: '0',
      limit: '10',
      sort: 'id_',
      dir: 'ASC',
    },
    parFilters: 'alias.column1#alias.column2',
    idDD: 'id_',
    descDD: 'desc',
    minChars: 2,
    renderOption: undefined, // (option) => <div />,
  },
  remote: true,
  gridForm: { xs: 12, sm: 12 },
  variant: 'outlined',
  isSearchable: false,
  validate: undefined,
  helperText: undefined,
  disabled: undefined,
  hide: undefined,
  group: undefined, // the default group ever is group1 or the first position in the object of the groups
};

export const defaultValuesDatePicker = {
  type: 'DatePicker',
  label: undefined,
  initialValue: '', // moment(new Date(), 'DD-MM-YYYY').toDate()
  minDate: null, // moment(new Date(), 'DD-MM-YYYY').subtract(5, 'days').toDate(),
  maxDate: null, // moment(new Date(), 'DD-MM-YYYY').add(1, 'month').toDate(),
  format: 'DD-MM-YYYY',
  gridForm: { xs: 12, sm: 12 },
  variant: 'outlined',
  validate: undefined,
  helperText: undefined,
  disabled: undefined,
  hide: undefined,
  group: undefined, // the default group ever is group1 or the first position in the object of the groups
};
