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

import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
const AutoplaySlider = withAutoplay(AwesomeSlider);

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

const ModalDetail = ({ open, handleClose }) => {
    const classes = useStyles();

    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Annai
            </Typography>
            <Button autoFocus color="secondary" variant="contained" onClick={handleClose}>
              Fijar Cita
            </Button>
          </Toolbar>
        </AppBar>
        <AutoplaySlider 
            play={true}
            cancelOnInteraction={false} // should stop playing on user interaction
            interval={5000}
        >
            <div data-src="https://pbs.twimg.com/media/DUJMTn8XcAAnuAR.jpg" />
            <div data-src="https://www.ctvnews.ca/polopoly_fs/1.4169897.1574420912!/httpImage/image.jpg_gen/derivatives/landscape_1020/image.jpg" />
            <div data-src="https://c4.wallpaperflare.com/wallpaper/105/218/545/angels-barefoot-blondes-commercial-wallpaper-preview.jpg" />
        </AutoplaySlider>
      </Dialog>
    )
};

export default ModalDetail;
