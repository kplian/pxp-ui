export const simpleForm = {
  nameForm: 'NameForm',
  columns: {},
  resetButton: true,
  submitLabel: 'Submit',
  onSubmit: {
    url: 'changeSystem/changeControl/changeMethod',
    extraParams: {},
  },
  typeForm: 'normal',
};
export const configTextField = {
  type: 'TextField',
  label: undefined,
  initialValue: '',
  maxLength: 255,
  gridForm: { xs: 12, sm: 12 },
  size: 'medium',
};
export const configAutoComplete = {
  type: 'AutoComplete',
  label: undefined,
  initialValue: null,
  store: {
    url: 'seguridad/Persona/listarPersona',
    params: {
      start: '0',
      limit: '10',
      sort: 'id_persona',
      dir: 'ASC',
    },
    load: false,
    parFilters: 'p.nombre_completo1#p.ci',
    idDD: 'id_persona',
    descDD: 'nombre_completo2',
    minChars: 2,
  },
  remote: true,
  gridForm: { xs: 12, sm: 12 },
  size: 'medium',
};
