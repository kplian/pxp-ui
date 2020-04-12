    /*Configuration object*/

    export default {
      host: '3.133.135.231',
      baseUrl: 'kerp/pxp/lib/rest',
      mode: 'cors', // same-origin || cors
      port: 80,
      protocol: 'http',
      backendRestVersion: '2',
      applicationName: 'ERP KPLIAN',
      menu: {
        system: 'all',//system name(sis_contabilidad), comma separated systems(sis_seguridad,sis_presupuestos), all
        mobile: true, //mobile flag [true,false]
        includeSystemRoot: false, // show systems menu [true,false]
        startExpanded: true,

        /*customRequest: {
          url:'',
          params: {}
        }*/
      }
    };
