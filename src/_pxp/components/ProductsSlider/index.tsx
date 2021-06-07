import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/fall-animation.css';
import { makeStyles } from '@material-ui/core/styles';
import Item from './ProductItem';
import './style.scss';

const useStyles = makeStyles((theme)=>({
    root: {

    }, 
    slider: {
        height: '98%',
        '--slider-height-percentage': '100%',
        '--slider-transition-duration': '770ms',
        '--organic-arrow-thickness': '4px',
        '--organic-arrow-border-radius': '0px',
        '--organic-arrow-height': '10px !important',
        '--organic-arrow-color': 'red !important',
        '--control-button-width': '10%',
        '--control-button-height': '25%',
        '--control-button-background': 'transparent',
        '--control-bullet-color': '#a3b9d0',
        '--control-bullet-active-color': '#8b9db1',
        '--loader-bar-color': '#851515',
        '--loader-bar-height': '6px',
    },
  }));

const ProductSlider = () => {
    const classes = useStyles();
    return (

        <AwesomeSlider
            className={classes.slider}
            animation="fallAnimation"
            fillParent={false}
            infinite={false}
            bullets={ false }
            // cssModule={[coreStyles, animationStyles]}
        >
            {
                [1,2,3,4,5,6].map(i => 
                <div key={i}>
                    <Item/>
                </div>)
            }
        </AwesomeSlider>

    )
};

export default ProductSlider;
