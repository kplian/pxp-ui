/**
 * Field mapping for user page
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 * @todo add last password change date
 * @todo add last login attempt date
 * @todo add number of login fails
 */
import config from '../../../config';

const isV1 = config.backendVersion === 'v1';
export default {
  userId: isV1 ? 'id_usuario' : 'user_id',
  personId: isV1 ? 'id_persona' : 'person_id',
  person: isV1 ? 'id_persona' : 'person_id',
  name: isV1 ? 'nombre' : 'name',
  surname1: isV1 ? 'ap_paterno' : 'surname1',
  surname2: isV1 ? 'ap_materno' : 'surname2',
  completeName: isV1 ? 'desc_person' : 'complete_name',
  pCompleteName1: isV1 ? 'nombre_completo1' : 'complete_name1',
  pCompleteName2: isV1 ? 'nombre_completo2' : 'complete_name2',
  nationalId: isV1 ? 'ci' : 'national_id',
  email: isV1 ? 'email' : 'email',
  username: isV1 ? 'cuenta' : 'username',
  expireDate: isV1 ? 'fecha_caducidad' : 'expire_date',
  createdDate: isV1 ? 'fecha_reg' : 'created_date',
  modifiedDate: isV1 ? 'fecha_mod' : 'modified_date',
  autenticationType: isV1 ? 'autentificacion' : 'autentication_type',
  role: isV1 ? 'id_rol' : 'role_id',
  roleName: isV1 ? 'rol' : 'role',
  roleSystem: isV1 ? 'nombre' : 'system',
  userRole: isV1 ? 'id_usuario_rol' : 'user_role_id',
  resetPass: isV1 ? 'reset_password' : 'reset_password',
};
