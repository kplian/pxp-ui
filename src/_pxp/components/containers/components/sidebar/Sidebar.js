import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer, Hidden, Box } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Profile from './Profile';
import SidebarNav from './SideBarNav';
import PerfectScrollbar from 'react-perfect-scrollbar';
import clsx from 'clsx';
import { colors } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(0)
  },
  divider: {
    backgroundColor: colors.grey[300],
  },
  nav: {
    marginBottom: theme.spacing(2)
  },
  boxDrawer: {
    borderRight: '1px solid' + colors.grey[300],
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();
//const pages = useSelector(state => state.auth.menu);

  const pages = [{
  "icon":"security",
  "text":"SEGURIDAD",
  "type":"carpeta",
  "id_gui":19,
  "childrens":[
     {
        "icon":"cast",
        "text":"Parametros",
        "type":"carpeta",
        "id_gui":28,
        "childrens":[
           {
              "icon":"security",
              "text":"Clasificador",
              "type":"hoja",
              "id_gui":24,
              "childrens":[

              ],
              "component":"clasificador"
           },
           {
              "icon":"",
              "text":"Tablas migradas ENDESIS",
              "type":"hoja",
              "id_gui":45,
              "childrens":[

              ],
              "component":"TablaMigrar"
           },
           {
              "icon":"",
              "text":"Persona",
              "type":"hoja",
              "id_gui":21,
              "childrens":[

              ],
              "component":"persona"
           },
           {
              "icon":"",
              "text":"Tipo Documento",
              "type":"hoja",
              "id_gui":30,
              "childrens":[

              ],
              "component":"tipo_documento"
           },
           {
              "icon":"",
              "text":"Patrones de Eventos",
              "type":"hoja",
              "id_gui":31,
              "childrens":[

              ],
              "component":"patron_evento"
           },
           {
              "icon":"",
              "text":"Horarios de Trabajo",
              "type":"hoja",
              "id_gui":32,
              "childrens":[

              ],
              "component":"horario_trabajo"
           }
        ],
        "component":""
     },
     {
        "icon":"",
        "text":"Procesos",
        "type":"carpeta",
        "id_gui":27,
        "childrens":[
           {
              "icon":"",
              "text":"Usuario",
              "type":"hoja",
              "id_gui":22,
              "childrens":[

              ],
              "component":"usuario"
           },
           {
              "icon":"",
              "text":"Rol",
              "type":"hoja",
              "id_gui":23,
              "childrens":[

              ],
              "component":"rol"
           },
           {
              "icon":"",
              "text":"Sistema",
              "type":"hoja",
              "id_gui":25,
              "childrens":[

              ],
              "component":"Subsistema"
           },
           {
              "icon":"delete",
              "text":"Monitoreo y An\u00e1lisis de Bit\u00e1coras",
              "type":"carpeta",
              "id_gui":33,
              "childrens":[
                 {
                    "icon":"",
                    "text":"Monitoreo",
                    "type":"carpeta",
                    "id_gui":34,
                    "childrens":[
                       {
                          "icon":"",
                          "text":"Monitor de Sistema",
                          "type":"hoja",
                          "id_gui":38,
                          "childrens":[

                          ],
                          "component":"monitor_sistema"
                       },
                       {
                          "icon":"",
                          "text":"Monitor de Uso de Recursos",
                          "type":"hoja",
                          "id_gui":39,
                          "childrens":[

                          ],
                          "component":"monitor_recursos"
                       },
                       {
                          "icon":"",
                          "text":"Monitor de Actividades en BD",
                          "type":"hoja",
                          "id_gui":40,
                          "childrens":[

                          ],
                          "component":"monitor_bd"
                       },
                       {
                          "icon":"",
                          "text":"Monitor de Objetos de BD",
                          "type":"hoja",
                          "id_gui":41,
                          "childrens":[

                          ],
                          "component":"monitor_objetos"
                       }
                    ],
                    "component":""
                 },
                 {
                    "icon":"edit",
                    "text":"An\u00e1lisis de Bit\u00e1coras",
                    "type":"carpeta",
                    "id_gui":35,
                    "childrens":[
                       {
                          "icon":"",
                          "text":"Bit\u00e1coras de Sistema",
                          "type":"hoja",
                          "id_gui":42,
                          "childrens":[

                          ],
                          "component":"bitacora_sistema"
                       },
                       {
                          "icon":"",
                          "text":"Bit\u00e1coras de BD",
                          "type":"hoja",
                          "id_gui":43,
                          "childrens":[

                          ],
                          "component":"bitacora_bd"
                       },
                       {
                          "icon":"",
                          "text":"Trabajo Fuera de Horario",
                          "type":"hoja",
                          "id_gui":44,
                          "childrens":[

                          ],
                          "component":"fuera_horario"
                       }
                    ],
                    "component":""
                 },
                 {
                    "icon":"",
                    "text":"Bloqueos",
                    "type":"hoja",
                    "id_gui":36,
                    "childrens":[

                    ],
                    "component":"bloqueo"
                 },
                 {
                    "icon":"",
                    "text":"Notificaciones",
                    "type":"hoja",
                    "id_gui":37,
                    "childrens":[

                    ],
                    "component":"notificacion"
                 }
              ],
              "component":""
           }
        ],
        "component":""
     },
     {
        "icon":"",
        "text":"Reportes",
        "type":"carpeta",
        "id_gui":29,
        "childrens":[
           {
              "icon":"",
              "text":"Personas",
              "type":"hoja",
              "id_gui":20,
              "childrens":[

              ],
              "component":"repPersona"
           }
        ],
        "component":""
     }
  ],
  "component":"Seguridad"
},
{
  "icon":"home_work",
  "text":"FLUJO DE TRABAJO",
  "type":"carpeta",
  "id_gui":348,
  "childrens":[
     {
        "icon":"",
        "text":"Categoria Documento",
        "type":"hoja",
        "id_gui":354,
        "childrens":[

        ],
        "component":"CategoriaDocumento"
     },
     {
        "icon":"",
        "text":"Tipo Proceso",
        "type":"hoja",
        "id_gui":350,
        "childrens":[

        ],
        "component":"TipoProceso"
     },
     {
        "icon":"",
        "text":"Proceso Macro",
        "type":"hoja",
        "id_gui":349,
        "childrens":[

        ],
        "component":"ProcesoMacro"
     },
     {
        "icon":"",
        "text":"Inicio de Tramites",
        "type":"hoja",
        "id_gui":351,
        "childrens":[

        ],
        "component":"ProcesoWfIniTra"
     },
     {
        "icon":"",
        "text":"Seguir Tramite",
        "type":"hoja",
        "id_gui":352,
        "childrens":[

        ],
        "component":"ProcesoWfVb"
     },
     {
        "icon":"",
        "text":"VoBo Procesos",
        "type":"hoja",
        "id_gui":353,
        "childrens":[

        ],
        "component":"VoBoProceso"
     },
     {
        "icon":"",
        "text":"Bitacoras Procesos",
        "type":"hoja",
        "id_gui":355,
        "childrens":[

        ],
        "component":"FormFiltro"
     }
  ],
  "component":""
}
];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        className={ clsx( classes.boxDrawer, className )}
      >
        <PerfectScrollbar options={{ suppressScrollX: true }}>
          <div
            {...rest}
            className={classes.root}
          >
            <Box p={2}>
              <Profile />
            </Box>
            <Divider className={classes.divider} />
            <Box p={2}>
              <SidebarNav
                className={classes.nav}
                pages={ pages }
              />        
            </Box>
          </div>
        </PerfectScrollbar>
      </Box>
    </Drawer>
  );
};

export default Sidebar;