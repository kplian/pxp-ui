/**
 * Main configuration file for pxp-ui
 * @uthor Jaime Rivera
 * @copyright Kplian Ltda 2020
 * These are possible configuration options and examples:
 * @param {string} host host for pxp client requests it can be ip or domain name (use of environment var is recommended)
 * @example host: process.env.REACT_APP_HOST
 * @param {string} baseUrl base folder route for pxp client requests 'kerp/pxp/lib/rest' for ip and 'lib/rest' for domain name (use of environment var is recommended)
 * @example baseUrl: process.env.REACT_APP_BASE_URL
 * @param {string} mode connecion mode for pxp client requests (same-origin|cors) (use of environment var is recommended)
 * @example mode: process.env.REACT_APP_MODE
 * @param {int} port port for pxp client requests 80 or 443 (use of environment var is recommended)
 * @example port: process.env.REACT_APP_PORT
 * @param {string} protocol Protocol for pxp client requests http or https (use of environment var is recommended)
 * @example protocol: process.env.REACT_APP_PROTOCOL
 * @param {string} backendRestVersion Pxp backend has two version php 5 v1 and php7 v2 values here are (1|2)
 * @example backendRestVersion: '2'
 * @param {string} applicationName
 * @example applicationName: 'ERP KPLIAN'
 * @param {string} recaptchaKey (use of environment var is recommended see env.sample for details)
 * @example recaptchaKey: '5456dsad45fsafsa'
 * @param {string} privateInitRoute If this is not defined will be redirected to /main
 * @example privateInitRoute: '/exa/masterdetail'
 * @param {string} publicInitRoute If this is not defined will be redireccted to /login
 * @example publicInitRoute: '/login'
 * @param {string} notFoundRoute When a not found route is found will be redirected to this route (usually in applications should redirect to login)
 * @example notFoundRoute: '/login'
 * @param {array} publicRoutes If there is no public route keep it as a empty array
 * @example publicRoutes: ['WEB__Home', 'WEB__About', 'WEB__Contact']
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
 *   folder: 'CODE', // If you only want to get menu items in a folder add folder code here
 *   customRequest: { //this request will be used to load dynamic menu instead of regular request
 *     url:'mysystem/mymenu',
 *     params: {
 *       param1: value1,
 *       param2: value2
 *     }
 *   }
 * }
 * @param date Configuration to manage date data
 * @example
 * date: {
 *   backendGetFormat: 'YYYY-MM-DD', // date format we get from backend
 *   backendSaveFormat: 'Y-m-d', // date format we need to send to backend
 *   defaultRenderFormat: 'DD-MM-YYYY', // this is format to render dates by default
 * },
 *
 * @param dateTime Configuration to manage dateTime data
 * @example
 * dateTime: {
 *   backendGetFormat: 'YYYY-MM-DD H:mm:ss:S', // date format we get from backend
 *   backendSaveFormat: 'YYYY-MM-DD H:mm:ss:S', // date format we need to send to backend
 *   backendTimezone: 'America/Los_Angeles', //backend timezone
 *   defaultRenderFormat: 'DD-MM-YYYY H:mm:ss', // this is format to render dates by default
 * }
 */

export default {
  host: process.env.REACT_APP_HOST,
  baseUrl: process.env.REACT_APP_BASE_URL,
  mode: process.env.REACT_APP_MODE,
  port: process.env.REACT_APP_PORT,
  protocol: process.env.REACT_APP_PROTOCOL,
  recaptchaKey: process.env.REACT_APP_RECAPTCHA_KEY,
  backendVersion: 'v1',
  backendRestVersion: '2',
  applicationName: 'ERP KPLIAN',
  privateInitRoute: '/exa/masterdetail',
  notFoundRoute: '/login',
  translations: {
    defaultNS: 'common',
    fallbackLng: 'en',
  },
  menu: {
    system: 'EXA',
    mobile: 0,
    includeSystemRoot: true,
    folder: 'NTA',
  },
  date: {
    backendGetFormat: 'YYYY-MM-DD',
    backendSaveFormat: 'Y-m-d',
    defaultRenderFormat: 'DD-MM-YYYY',
  },
  dateTime: {
    backendGetFormat: 'YYYY-MM-DD H:mm:ss:S',
    backendSaveFormat: 'YYYY-MM-DD H:mm:ss:S',
    backendTimezone: 'America/Los_Angeles',
    defaultRenderFormat: 'DD-MM-YYYY H:mm:ss',
  },
};
