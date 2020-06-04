/**
 * Examples Table pxp
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
import React, { useRef } from 'react';
import * as Yup from 'yup';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Avatar from '@material-ui/core/Avatar';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import WcIcon from '@material-ui/icons/Wc';
import Label from '../../../_pxp/components/Label';
import TablePxp from '../../../_pxp/components/Table/TablePxp';
import imgAvatar from '../../../_pxp/components/Table/avatar.jpeg';
import ButtonPxp from '../../../_pxp/components/ButtonPxp';
import IconPxp from '../../../_pxp/icons/IconPxp';
import BasicContainer from '../../../_pxp/containers/BasicContainer';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1),
  },
}));

const ExampleTable = () => {
  const classes = useStyles();
  const refTable = useRef();
  const jsonPersona = {
    nameForm: 'Formulario Persona',
    columns: {
      nombre: {
        type: 'TextField',
        initialValue: '',
        // typeTextField: 'password',
        label: 'Nombre',
        gridForm: { xs: 12, sm: 4 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Required'),
        },
        renderColumn: (row) => {
          return (
            <Box display="flex" alignItems="center">
              <Avatar className={classes.avatar} src={imgAvatar} />
              <div>
                <Typography variant="body2" color="inherit">
                  <b>Nombre:</b>
                  {row.nombre_completo2}
                </Typography>
                <Label color="success">
                  <b>Ci:</b>
                  {row.ci}
                </Label>
              </div>
            </Box>
          );
        },
      },
      ap_paterno: {
        type: 'TextField',
        initialValue: '',
        label: 'Apellido Paterno',
        gridForm: { xs: 12, sm: 4 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Required'),
        },
        filters: { pfiltro: 'p.apellido_paterno', type: 'string' },
        search: true,
      },
      ap_materno: {
        type: 'TextField',
        initialValue: '',
        label: 'Apellido Materno',
        gridForm: { xs: 12, sm: 4 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Required'),
        },
        filters: { pfiltro: 'p.apellido_materno', type: 'string' },
        search: true,
      },
      ci: {
        type: 'TextField',
        initialValue: '',
        label: 'CI',
        gridForm: { xs: 12, sm: 6 },
        variant: 'outlined',
        validate: {
          shape: Yup.string().required('Required'),
        },
      },
      genero: {
        type: 'Dropdown',
        label: 'Genero',
        initialValue: '',
        store: [
          { value: '', label: '' },
          { value: 'masculino', label: 'masculino' },
          {
            value: 'femenino',
            label: 'femenino',
          },
        ],
        gridForm: { xs: 12, sm: 6 },
        variant: 'outlined',
      },

      tipo_documento: {
        type: 'Dropdown',
        label: 'Tipo Documento',
        initialValue: '',
        store: [
          { value: '', label: '' },
          {
            value: 'documento_identidad',
            label: 'documento_identidad',
          },
          { value: 'pasaporte', label: 'pasaporte' },
        ],
        gridForm: { xs: 12, sm: 6 },
        variant: 'outlined',
      },
      expedicion: {
        type: 'Dropdown',
        label: 'Expedido',
        initialValue: '',
        store: [
          { value: '', label: '' },
          { value: 'CB', label: 'CB' },
          { value: 'LP', label: 'LP' },
          { value: 'BN', label: 'BN' },
        ],
        gridForm: { xs: 12, sm: 6 },
        variant: 'outlined',
      },
    },
    getDataTable: {
      url: 'seguridad/Persona/listarPersonaFoto',
      params: {
        start: '0',
        limit: '10',
        sort: 'id_persona',
        dir: 'desc', // for seeing every time the last save
        contenedor: 'docs-per',
      },
      load: false,
    },
    idStore: 'id_persona',
    buttonDel: true,
    buttonNew: true,
    buttonEdit: true,
    actionsTableCell: {
      buttonDel: true,
      buttonEdit: true,
      extraButtons: {
        otherButton: {
          label: 'otro',
          buttonIcon: <AddShoppingCartIcon />,
          onClick: (row) => {
            alert('llega');
            console.log(row);
          },
        },
        otro2: {
          label: 'otro',
          buttonIcon: <WcIcon />,
          onClick: (row) => {
            alert('otro2');
            console.log(row);
          },
        },
      },
      /* icon: <AddShoppingCartIcon />,
      onClick: (row) => {
        alert('llega');
        console.log(row);
      }, */
    },
    resetButton: true,
    onSubmit: {
      url: 'seguridad/Persona/guardarPersona',
      extraParams: {
        correo: '',
        celular1: '',
        celular2: '',
        telefono1: '',
        telefono2: '',
        matricula: '',
        historia_clinica: '',
        direccion: '',
        fecha_nacimiento: '',
        grupo_sanguineo: '',
        abreviatura_titulo: '',
        profesion: '',
      },
      // todo need to add typeSend for change to send all in jsonFormat or normal pxp
    },
    urlDelete: 'seguridad/Persona/eliminarPersona',
    //paginationType: 'infiniteScrolling', // can be infiniteScrolling or pagination
  };

  // example how you can refresh the table from another component
  const refreshTableFromOtherSide = () => {
    console.log(refTable);
    const { set } = refTable.current.jsonStore;
    set((prevData) => ({
      ...prevData,
      params: {
        ...prevData.params,
        otherParam: 'other',
      },
      load: true,
    }));
  };

  return (
    <BasicContainer>
      <ButtonPxp icon={<IconPxp />} onClick={refreshTableFromOtherSide} />
      <TablePxp dataConfig={jsonPersona} ref={refTable} />
    </BasicContainer>
  );
};

export default ExampleTable;
