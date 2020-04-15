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
        system: 'SEGU,WF',//system name(sis_contabilidad), comma separated systems(sis_seguridad,sis_presupuestos), all
        mobile: 0, //mobile flag [true,false]
        includeSystemRoot: true, // show systems menu [true,false]
        startExpanded: true,

        /*customRequest: {
          url:'',
          params: {}
        }*/
      }
    };
