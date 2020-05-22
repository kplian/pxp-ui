/**
 * Component for uploading files from Manager File
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 *
 */
import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import * as Yup from 'yup';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import WcIcon from '@material-ui/icons/Wc';
import { DropzoneDialog } from 'material-ui-dropzone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import TablePxp from '../../../_pxp/components/Table/TablePxp';
import Label from '../../../_pxp/components/Label';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 30,
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1),
  },
  avatarYellow: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1),
    color: theme.palette.getContrastText('#ffd600'),
    backgroundColor: '#ffd600',
    cursor: 'pointer',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const ManagerFile = (props) => {
  const classes = useStyles();

  const { id = 111, table = 'titem', cod = 'fotoItem' } = props;
  const [open, setOpen] = React.useState(false);

  const jsonItem = {
    nameForm: 'Manager File',
    columns: {
      codigo: {
        label: 'Codigo',
        renderColumn: (row) => {
          let urlFile = '';
          if (row.id_archivo) {
            urlFile = row.folder;
            urlFile = urlFile.split('./../../../')[1];
            urlFile = `http://34.71.236.75/kerp/${urlFile}${row.nombre_archivo}.${row.extension}`;
          }

          return (
            <Box display="flex" alignItems="center">
              {row.id_archivo ? (
                <Avatar className={classes.avatar} src={urlFile} />
              ) : (
                <Avatar className={classes.avatarYellow} onClick={()=>{setOpen(true)}}>
                  <CloudUploadIcon />
                </Avatar>
              )}
              {}
              <div>
                <Typography variant="body2" color="inherit">
                  {row.codigo}
                </Typography>
              </div>
            </Box>
          );
        },
      },
    },
    /* p: {"start":"0","limit":"50","tabla":"titem","id_tabla":"1","sort":"tipar.orden","dir":"ASC"}
     */
    getDataTable: {
      url: 'parametros/Archivo/listarArchivoCodigo',
      params: {
        start: '0',
        limit: '50',
        sort: 'tipar.orden',
        dir: 'ASC', // for seeing every time the last save
        id_tabla: id,
        tabla: table,
      },
      // load: false,
    },
    idStore: 'id_tipo_archivo',
    buttonDel: true,
    buttonNew: true,
    actionsTableCell: {
      buttonDel: false,
      buttonEdit: false,
      extraButtons: {
        uploadFile: {
          label: 'Upload File',
          buttonIcon: <CloudUploadIcon />,
          onClick: (row) => {
            alert('llega');
            console.log(row);
          },
        },
        viewFile: {
          label: 'View File',
          buttonIcon: <VisibilityIcon />,
          onClick: (row) => {
            alert('otro2');
            console.log(row);
          },
          disabled: true,
        },
        deleteFile: {
          label: 'Delete File',
          buttonIcon: <DeleteIcon />,
          onClick: (row) => {
            alert('otro2');
            console.log(row);
          },
          disabled: true,
        },
      },
      /* icon: <AddShoppingCartIcon />,
      onClick: (row) => {
        alert('llega');
        console.log(row);
      }, */
    },
    onClickRow: ({ row, statesButtonsTableCell }) => {
      if (row.id_archivo) {
        statesButtonsTableCell.viewFile.enable();
        statesButtonsTableCell.deleteFile.enable();
      } else {
        statesButtonsTableCell.viewFile.disable();
        statesButtonsTableCell.deleteFile.disable();
      }
    },
    resetButton: true,
    onSubmit: {
      url: 'mercado/Item/insertarItem',
      extraParams: {
        formato: '',
        metros_en_caja: '',
      },
      // todo need to add typeSend for change to send all in jsonFormat or normal pxp
    },
    urlDelete: 'parametros/Archivo/listarArchivoCodigo',
    // paginationType: 'infiniteScrolling', // can be infiniteScrolling or pagination
  };
  return (
    <>
      <PerfectScrollbar id="content">
        <TablePxp dataConfig={jsonItem} />
        <DropzoneDialog
          acceptedFiles={['image/*']}
          cancelButtonText="cancel"
          submitButtonText="submit"
          maxFileSize={5000000}
          open={open}
          onClose={() => setOpen(false)}
          onSave={(files) => {
            console.log('Files:', files);
            setOpen(false);
          }}
          showPreviews
          showFileNamesInPreview
        />
      </PerfectScrollbar>
    </>
  );
};

export default ManagerFile;
