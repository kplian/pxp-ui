/**
 * Component for setup typeFile for using in manager file
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 *
 */
import React from 'react';

import TablePxp from '../../../_pxp/components/Table/TablePxp';
import BasicContainer from '../../../_pxp/containers/BasicContainer';

const TypeFile = ({ table, idTableDesc }) => {
  const jsonTypeFile = {
    nameForm: 'Formulario Type File',
    columns: {
      codigo: {
        type: 'TextField',
        initialValue: '',
        label: 'Codigo',
        gridForm: { xs: 12, sm: 12 },
      },
      nombre: {
        type: 'TextField',
        initialValue: '',
        label: 'Nombre',
        gridForm: { xs: 12, sm: 12 },
      },
      tabla: {
        type: 'TextField',
        initialValue: table || '',
        label: 'Tabla',
        gridForm: { xs: 12, sm: 12 },
        ...(table && { disabled: true }),
      },
      nombre_id: {
        type: 'TextField',
        initialValue: idTableDesc || '',
        label: 'Nombre Id',
        gridForm: { xs: 12, sm: 12 },
        ...(idTableDesc && { disabled: true }),
      },
      tipo_archivo: {
        type: 'Dropdown',
        label: 'Tipo Archivo',
        initialValue: '',
        store: [
          { value: '', label: '' },
          { value: 'imagen', label: 'Imagen' },
          {
            value: 'documento',
            label: 'Documento',
          },
        ],
        gridForm: { xs: 12, sm: 6 },
        variant: 'outlined',
        onChange: ({ value, states }) => {
          if (value === 'imagen') {
            states.extensiones_permitidas.setValue('png,jpeg,jpg');
          } else {
            states.extensiones_permitidas.setValue(
              'png,jpeg,jpg,doc,docx,pdf,PDF,DOC,DOCX,xls,xlsx,XLS,XLSX,rar',
            );
          }
        },
      },
      extensiones_permitidas: {
        type: 'TextField',
        initialValue: '',
        label: 'extensiones_permitidas',
        gridForm: { xs: 12, sm: 12 },
        hide: true,
      },

      multiple: {
        type: 'Dropdown',
        label: 'Multiple',
        initialValue: '',
        store: [
          { value: '', label: '' },
          { value: 'si', label: 'Si' },
          {
            value: 'no',
            label: 'No',
          },
        ],
        gridForm: { xs: 12, sm: 6 },
        variant: 'outlined',
      },
      obligatorio: {
        type: 'Dropdown',
        label: 'Obligatorio',
        initialValue: '',
        store: [
          { value: '', label: '' },
          { value: 'si', label: 'Si' },
          {
            value: 'no',
            label: 'No',
          },
        ],
        gridForm: { xs: 12, sm: 6 },
        variant: 'outlined',
      },
      tamano: {
        type: 'TextField',
        initialValue: '',
        label: 'Tamano',
        gridForm: { xs: 12, sm: 12 },
      },
      orden: {
        type: 'TextField',
        initialValue: '',
        label: 'Orden',
        gridForm: { xs: 12, sm: 12 },
      },
    },
    getDataTable: {
      url: 'parametros/TipoArchivo/listarTipoArchivo',
      params: {
        start: '0',
        limit: '10',
        sort: 'id_tipo_archivo',
        dir: 'desc',
        ...(table && { tabla: table }),
      },
    },
    idStore: 'id_tipo_archivo',
    ...(table ? { buttonDel: false } : { buttonDel: true }),
    buttonNew: true,
    actionsTableCell: {
      buttonDel: true,
      ...(table ? { buttonDel: false } : { buttonDel: true }),
      buttonEdit: false,
    },
    resetButton: true,
    onSubmit: {
      url: 'parametros/TipoArchivo/insertarTipoArchivo',
      extraParams: {
        ruta_guardar: '',
        ...(table && { tabla: table }),
      },
    },
    urlDelete: 'parametros/TipoArchivo/eliminarTipoArchivo',
  };

  return (
    <BasicContainer>
      <TablePxp dataConfig={jsonTypeFile} />
    </BasicContainer>
  );
};

export default TypeFile;
