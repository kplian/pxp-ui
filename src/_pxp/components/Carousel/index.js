import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import './style.scss';

const AutoplaySlider = withAutoplay(AwesomeSlider);

const useStyles = makeStyles((theme) => ({
  root: {
    '--slider-height-percentage': '50% !important',
    '--slider-transition-duration': '770ms',
    '--organic-arrow-thickness': '4px',
    '--organic-arrow-border-radius': '10px  !important',
    '--organic-arrow-height': '16px !important',
    '--organic-arrow-color': `${theme.palette.secondary.main} !important`,
    '--control-button-width': '10%',
    '--control-button-height': '25%',
    '--control-button-background': 'transparent',
    '--control-bullet-color': `${theme.palette.secondary.dark} !important`,
    '--control-bullet-active-color': `${theme.palette.secondary.main} !important`,
    '--loader-bar-color': `${theme.palette.primary.dark} !important`,
    '--loader-bar-height': '5px  !important',
  },
}));

const Carousel = ({ images }) => {
  const classes = useStyles();

  return (
    <AutoplaySlider
      className={classes.root}
      play
      cancelOnInteraction={false} // should stop playing on user interaction
      interval={5000}
    >
      <div data-src="https://pbs.twimg.com/media/DUJMTn8XcAAnuAR.jpg" />
      <div data-src="https://www.ctvnews.ca/polopoly_fs/1.4169897.1574420912!/httpImage/image.jpg_gen/derivatives/landscape_1020/image.jpg" />
      <div data-src="https://c4.wallpaperflare.com/wallpaper/105/218/545/angels-barefoot-blondes-commercial-wallpaper-preview.jpg" />
    </AutoplaySlider>
  );
};

export default Carousel;
