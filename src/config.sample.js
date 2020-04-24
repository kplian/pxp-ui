/**
 * Main configuration file for pxp-ui
 * @uthor Jaime Rivera
 * @copyright Kplian Ltda 2020
 * These are possible configuration options and examples:
 * @param {string} host host for pxp client requests
 * @example host: '3.133.135.231'
 * @param {string} baseUrl base folder route for pxp client requests
 * @example baseUrl: 'kerp/pxp/lib/rest'
 * @param {string} mode connecion mode for pxp client requests (same-origin|cors)
 * @example mode: 'cors'
 * @param {int} port port for pxp client requests
 * @example port: 80
 * @param {string} protocol Protocol for pxp client requests
 * @example protocol: 'http'
 * @param {string} backendRestVersion Pxp backend has two version php 5 v1 and php7 v2 values here are (1|2)
 * @example backendRestVersion: '2'
 * @param {string} applicationName
 * @example applicationName: 'ERP KPLIAN'
 * @param {string} privateInitRoute If this is not defined will be redirected to /main
 * @example privateInitRoute: '/segu/init'
 * @param {string} publicInitRoute If this is not defined will be redireccted to /login
 * @example publicInitRoute: '/login'
 * @param {array} publicRoutes If there is no public route keep it as a empty array
 * @example publicRoutes: ['/web/about', '/web/contact', '/web/home']
 * @param translations translations should be in json format in (public/locales/{lan}/{namespace}.json)
 * @example
 * translations: {
 *   defaultNS: 'common', //default name space for translations
 *   fallbackLng: 'en', //what will be the language in case of translation doesn't exists
 * }
 * @param menu Requested menu for logged in users
 * @example
 * menu: {
 *   system: 'ORGA,WF', // system name(sis_contabilidad), comma separated systems(sis_seguridad,sis_presupuestos), all
 *   mobile: 0, // mobile flag [0,1]
 *   includeSystemRoot: true, // show systems menu [true,false]
 *   customRequest: { //this request will be used to load dynamic menu instead of regular request
 *     url:'mysystem/mymenu',
 *     params: {
 *       param1: value1,
 *       param2: value2
 *     }
 *   }
 * }
 */

export default {
  host: '3.133.135.231',
  baseUrl: 'kerp/pxp/lib/rest',
  mode: 'cors',
  port: 80,
  protocol: 'http',
  backendRestVersion: '2',
  applicationName: 'ERP KPLIAN',
  privateInitRoute: '/segu/init',
  translations: {
    defaultNS: 'common',
    fallbackLng: 'en',
  },
  menu: {
    system: 'ORGA,WF',
    mobile: 0,
    includeSystemRoot: true,
  },
};
