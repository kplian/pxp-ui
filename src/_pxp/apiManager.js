import _ from 'lodash';
import config from '../config';

const ver = config.backendVersion || 'v1';
const api = {
  segu: {
    user: {
      list:
        ver === 'v1'
          ? 'seguridad/Usuario/listarUsuario'
          : 'security/User/listUser',
      save:
        ver === 'v1'
          ? 'seguridad/Usuario/modificarUsuario'
          : 'security/updateUser',
    },
    person: {
      list:
        ver === 'v1'
          ? 'seguridad/Persona/listarPersona'
          : 'security/Person/listPerson',
      save:
        ver === 'v1' ? 'seguridad/modificarPersona' : 'security/updatePerson',
    },
    role: {
      list: ver === 'v1' ? 'seguridad/Rol/listarRol' : 'security/listPerson',
      save:
        ver === 'v1' ? 'seguridad/modificarPersona' : 'security/updatePerson',
    },
    userRole: {
      list:
        ver === 'v1'
          ? 'seguridad/UsuarioRol/listarUsuarioRol'
          : 'security/listPerson',
      save:
        ver === 'v1'
          ? 'seguridad/UsuarioRol/guardarUsuarioRol'
          : 'security/updatePerson',
      delete:
        ver === 'v1'
          ? 'seguridad/UsuarioRol/eliminarUsuarioRol'
          : 'security/updatePerson',
    },
  },
};
export default _.merge(api, config.pxpApi);
