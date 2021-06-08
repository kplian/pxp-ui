import React from 'react';
import ListPxpData from "../../../_pxp/components/ListPxp/ListPxpData";

const ExampleList = () => {
  const options = [
    {
      value: 'ALTO SECRETO',
      icon: 'alarm_on',
      label: 'SECRETO',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRU4KjHWiZ9CBeljoaUXdJrD1dXifFR24z237Si_JItPV_N_U_N&usqp=CAU'
    },
    {
      value: 'rene',
      icon: 'add',
      label: 'RENE(S)',
      image: 'https://cdn4.iconfinder.com/data/icons/pretty_office_3/256/Accept-Male-User.png',
    },
    {
      value: 'inactivo',
      icon: 'delete',
      label: 'Inactivos'
    },
    {
      value: 'activo',
      icon: 'face',
      label: 'Activos',
      image: 'https://static.eldeber.com.bo//Files/Original/sites/eldeber/img/2019/04/18/meme.jpg'
    },
    {
      value: 'inactivo',
      icon: 'favorite',
      label: 'Inactivos'
    }, {
      value: 'activo',
      icon: 'home',
      label: 'Activos'
    },
    {
      value: 'inactivo',
      icon: 'pets',
      label: 'Inactivos'
    }];

  const listConfig = {
    showActions: true,
    showDetail: true,
    showSearch: true,
    showFilter: false,
    filters: options,
    columns: {
      render: (row) => {
        return <table>
          <tbody>
            <tr><th>Usuario: </th><td>{ row.desc_person }</td></tr>
            <tr><th>Activo: </th><td>{ row.estado_reg }</td></tr>
          </tbody>              
        </table>;
      },
      primary: {
        field: 'desc_person',
        renderOption: (row) => {
          return <div>{ `Soy ${row.desc_person}` }</div>
        }
      },
      secondary: {
        field: 'descripcion',
        // renderOption: ( row ) => {
        //   // no return tag div
        //   return <>Render</>
        // }
      },
      terciary: {
        field: 'fecha_reg',
        text: 'Fecha',
        level: 3,
        // renderOption: ( row ) => {
        //   return <div>Render</div>
        // }
      },
      // detailRender: ( row ) => {
      //   // return (
      //   //   Object.keys( row ).map( key =>
      //   //     <div key={key}>
      //   //       <div>
      //   //         <label style={{ color: 'red'}}>{key}:  </label>
      //   //         <span>{row[key]}</span>
      //   //       </div>
      //   //       <hr/>
      //   //     </div>
      //   //   )
      //   // );
      //   return <ExampleFrom></ExampleFrom>
      // },
      detail: [
        {
          field: 'fecha_reg',
          text: 'Fecha de Registro'
        },
        {
          field: 'fecha_caducidad',
          text: 'Fecha de Caducidad'
        }, {
          field: 'cuenta',
          text: 'Cuenta'
        }
      ]
    },
    getDataTable: {
      url: 'seguridad/Usuario/listarUsuario',
      params: {
        limit: 20,
        sort: 'nombre',
        dir: 'ASC',
        contenedor: 'docs-USUARI',
        bottom_filter_fields: 'nombre_completo1,cuenta,descripcion',
      },
    },
  };

  return (
    <div>
      <h2>Demo List Component</h2>
      <ListPxpData config={listConfig} />
    </div>
  )
};

export default ExampleList;
