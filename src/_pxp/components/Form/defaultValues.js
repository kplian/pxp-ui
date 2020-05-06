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
};
export const defaultValuesAutoComplete = {
  type: 'AutoComplete',
  label: undefined,
  initialValue: '',
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
};
