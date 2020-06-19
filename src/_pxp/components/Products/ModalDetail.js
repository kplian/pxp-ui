import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import Features from './Features';
import Carousel from '../Carousel';
import ItemTitle from './Item/ItemTitle';
import ItemRating from './Item/ItemRating';

const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ModalDetail = ({ open, handleClose, item, columns }) => {
    const classes = useStyles();

    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              { item.alias }
            </Typography>
            <Button autoFocus color="secondary" variant="contained" onClick={handleClose}>
              Fijar Cita
            </Button>
          </Toolbar>
        </AppBar>
        <Carousel/>
        <ItemTitle 
          title={  item[ columns.title ] } 
          subtitle={  item[ columns.subtitle ] } 
          active={ typeof columns.active === 'function' ? columns.active(item) : item[ columns.active ] }
        />
        <ItemRating rating={4.5} className={{
          // position: 'relative !important'
        }}/>
        <Features item={item} features={
          [
            {
              label: 'Precio',
              pipe: (item ) => 
                  Math.round((parseFloat(item.precio_hora) + Number.EPSILON) * 100) / 100 + 'Bs'
          },
          {
            label: 'Ciudad',
            field: 'ciudad'
          },
          {
              label: 'Distancia',
              pipe: (item) => Math.round((parseFloat(item.distancia) + Number.EPSILON) * 100) / 100 + 'Km'
          },
          ]  
        }/>
      </Dialog>
    )
};

export default ModalDetail;
