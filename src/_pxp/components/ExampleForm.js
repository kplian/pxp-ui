import React from 'react';
import * as Yup from 'yup';
import Form from './../components/Form/Form';

const ExampleForm = () => {

    const jsonPersona = {
        nameForm: 'Formulario Persona',
        columns: {
            nombre: {
                type: 'TextField',
                label: 'Nombre',
                initialValue: '',
                allowBlank: false,
                maxLength: 255,
                gridForm: { xs: 12, sm: 4 },
                variant: 'outlined',
                validate: {
                    shape: Yup.string().required('Required')
                }
            },
            ap_paterno: {
                type: 'TextField',
                label: 'Apellido Paterno',
                initialValue: '',
                allowBlank: false,
                maxLength: 255,
                gridForm: { xs: 12, sm: 4 },
                variant: 'outlined',
                validate: {
                    shape: Yup.string().required('Required')
                }
            },
            ap_materno: {
                type: 'TextField',
                label: 'Apellido Materno',
                initialValue: '',
                allowBlank: false,
                maxLength: 255,
                gridForm: { xs: 12, sm: 4 },
                variant: 'outlined',
                validate: {
                    shape: Yup.string().required('Required')
                }
            },
            ci: {
                type: 'TextField',
                label: 'CI',
                initialValue: '',
                allowBlank: false,
                maxLength: 255,
                gridForm: { xs: 12, sm: 6 },
                variant: 'outlined',
                validate: {
                    shape: Yup.string().required('Required')
                }
            },
            genero: {
                type: 'Dropdown',
                label: 'Genero',
                initialValue: '',
                store: [{ value: '', label: '' }, { value: 'masculino', label: 'masculino' }, {
                    value: 'femenino',
                    label: 'femenino'
                }],
                gridForm: { xs: 12, sm: 6 },
                variant: 'outlined'

            },

            tipo_documento: {
                type: 'Dropdown',
                label: 'Tipo Documento',
                initialValue: '',
                store: [{ value: '', label: '' }, {
                    value: 'documento_identidad',
                    label: 'documento_identidad'
                }, { value: 'pasaporte', label: 'pasaporte' }],
                gridForm: { xs: 12, sm: 6 },
                variant: 'outlined'

            },
            expedicion: {
                type: 'Dropdown',
                label: 'Expedido',
                initialValue: '',
                store: [
                    { value: '', label: '' },
                    { value: 'CB', label: 'CB' },
                    { value: 'LP', label: 'LP' },
                    { value: 'BN', label: 'BN' }
                ],
                gridForm: { xs: 12, sm: 6 },
                variant: 'outlined'

            }
        },
        onSave: {
            url: 'seguridad/Persona/guardarPersona',
            extraParams:{ correo:'' ,celular1:'', celular2:'', telefono1:'', telefono2:'', matricula:'', historia_clinica:'',
                direccion:'',
                fecha_nacimiento: '',
                grupo_sanguineo: '',
                abreviatura_titulo: '',
                profesion: ''

            },
            //todo need to add typeSend for change to send all in jsonFormat or normal pxp
        }
    };

    return (
        <Form data={jsonPersona}/>
    );
};

export default ExampleForm;
