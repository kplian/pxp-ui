    /*Configuration object*/

    export default {
      host: '3.133.135.231',
      baseUrl: 'kerp/pxp/lib/rest',
      mode: 'cors', // same-origin || cors
      port: 80,
      protocol: 'http',
      backendRestVersion: '2',
      applicationName: 'ERP KPLIAN',
      privateInitRoute: '/segu/init',// if this is not defined will be redirected to /main
      publicInitRoute: '/login', //if this is not defined will be redireccted to /login
      publicRoutes: [],//if there is no public route keet it as a empty array 

      menu: {
        system: 'ORGA,WF',//system name(sis_contabilidad), comma separated systems(sis_seguridad,sis_presupuestos), all
        mobile: 0, //mobile flag [true,false]
        includeSystemRoot: true, // show systems menu [true,false]
        startExpanded: true,

        /*customRequest: {
          url:'',
          params: {}
        }*/
      }
    };
