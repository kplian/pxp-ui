import React from 'react';
import ListPxp from "./ListPxp/ListPxp";
import connection from 'pxp-client';

const ExampleList = () => {

    const [ configData, setConfigData ] = React.useState({
      data :[],
      hasMore: true,
      limit: 12,
      start: 0,
      total: 9999
    });
    const getData = async ( start=0, limit=20) => {
        console.log('config', configData );
        if( configData.total > configData.data.length ) {
          const resp = await connection.doRequest({
              url: 'seguridad/Usuario/listarUsuario',
              params: {
                  'start': start,
                  'limit': limit,
                  'sort': 'nombre',
                  'dir': 'ASC',
                  'contenedor': 'docs-USUARI',
              }
          });
          if( resp && resp.datos ) {
              console.log('data', resp);
              setTimeout(()=>{
                resp.datos.forEach( item => configData.data.push(item));
                setConfigData( prev => {
                  return {
                  ...prev,
                  total: parseInt(resp.total),
                  start: prev.start + prev.limit
                }});            
              }, 2000);
          }
              
        } else {
          setConfigData( prev => ({
            ...prev,
            hasMore: false
          }));
        }        
    };

    const listConfig = {
        showActions: true,
        showSearch: true,
        render: {
          primary: {
            field: 'desc_person',
            renderOption: ( row ) => {
              return <div>Render</div>
            }
          },
          secondary: {
            field: 'estado_reg',
            renderOption: ( row ) => {
              return <div>Render</div>
            }
          },
          terciary: {
            field: 'fecha_reg',
            text: 'Fecha',
            level: 3,
            renderOption: ( row ) => {
              return <div>Render</div>
            }
          },
          detail: [
          {
            field:'fecha_reg',
            text: 'Fecha de Registro'
          },
          {
            field:'fecha_caducidad',
            text: 'Fecha de Caducidad'
          },{
            field:'cuenta',
            text: 'Cuenta'
          }]
        },
        infiniteScroll: {
          hasMore: configData.hasMore,
          parent: document.getElementById('content'),
          onLoadMore: () => {
            // setTimeout(()=>{
              getData( configData.start, configData.limit );
            // }, 5000);
          }
        }
    };

    React.useEffect(()=> {
      if( configData.start === 0 && configData.data.length === 0) {
        getData( configData.start, configData.limit );
      }
    }, [])
    return (
        <div>
            <h2>Demo List Component</h2>
            <ListPxp data={ configData.data } config={ listConfig }></ListPxp>
        </div>
    )
};

export default ExampleList;
