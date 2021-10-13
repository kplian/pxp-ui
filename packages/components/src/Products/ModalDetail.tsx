import React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

import Features from './Features';
import Carousel from '../Carousel';
import ItemTitle from './Item/ItemTitle';
import ItemRating from './Item/ItemRating';
import { Theme } from '@mui/material';

const useStyles: any = makeStyles((theme:Theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition: any = React.forwardRef(function Transition(props: any, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalDetail = ({ open, handleClose, item, columns }) => {
  const classes = useStyles();

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {item.alias}
          </Typography>
          <Button
            autoFocus
            color="secondary"
            variant="contained"
            onClick={handleClose}
          >
            Fijar Cita
          </Button>
        </Toolbar>
      </AppBar>
      <Carousel images={[]}/>
      <ItemTitle
        title={item[columns.title]}
        subtitle={item[columns.subtitle]}
        active={
          typeof columns.active === 'function'
            ? columns.active(item)
            : item[columns.active]
        }
      />
      <ItemRating
        rating={4.5}
        className={
          {
            // position: 'relative !important'
          }
        }
      />
      <Features
        item={item}
        features={[
          {
            label: 'Precio',
            pipe: (item) =>
              `${
                Math.round(
                  (parseFloat(item.precio_hora) + Number.EPSILON) * 100,
                ) / 100
              }Bs`,
          },
          {
            label: 'Ciudad',
            field: 'ciudad',
          },
          {
            label: 'Distancia',
            pipe: (item: any) =>
              `${
                Math.round(
                  (parseFloat(item.distancia) + Number.EPSILON) * 100,
                ) / 100
              }Km`,
          },
        ]}
      />
    </Dialog>
  );
};

export default ModalDetail;
