import _ from 'lodash';
import config from '../config';

const ver = config.backendVersion || 'v1';
const api = {
  segu: {
    user: {
      list: ver === 'v1' ? 'seguridad/listarUsuario' : 'security/listUser',
      update:
        ver === 'v1' ? 'seguridad/modificarUsuario' : 'security/updateUser',
    },
    person: {
      list: ver === 'v1' ? 'seguridad/listarPersona' : 'security/listPerson',
      update:
        ver === 'v1' ? 'seguridad/modificarPersona' : 'security/updatePerson',
    },
  },
};
export default _.merge(api, config.pxpApi);
