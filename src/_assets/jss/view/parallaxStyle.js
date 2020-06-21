/**
 * Parallax Style
 * @copyright Kplian Ltda 2020
 * @uthor Favio Figueroa
 */
import { blackColor, primaryColor, roseColor, hexToRgb } from '../pxp-ui';

const parallaxStyle = {
  parallax: {
    height: '100vh',
    maxHeight: '1600px',
    overflow: 'hidden',
    position: 'relative',
    backgroundPosition: '50%',
    backgroundSize: 'cover',
    margin: '0',
    padding: '0',
    border: '0',
    display: 'flex',
    alignItems: 'center',
  },
  filter: {},
  primaryColor: {
    '&:before': {
      background: `rgba(${hexToRgb(blackColor)}, 0.5)`,
    },
    '&:after': {
      background: `linear-gradient(60deg,rgba(${hexToRgb(
        primaryColor[4],
      )},.56),rgba(${hexToRgb(primaryColor[5])},.95))`,
    },
    '&:after,&:before': {
      position: 'absolute',
      zIndex: '1',
      width: '100%',
      height: '100%',
      display: 'block',
      left: '0',
      top: '0',
      content: "''",
    },
  },
  roseColor: {
    '&:before': {
      background: `rgba(${hexToRgb(blackColor)}, 0.5)`,
    },
    '&:after': {
      background: `linear-gradient(60deg,rgba(${hexToRgb(
        roseColor[3],
      )},.56),rgba(${hexToRgb(roseColor[4])},.95))`,
    },
    '&:after,&:before': {
      position: 'absolute',
      zIndex: '1',
      width: '100%',
      height: '100%',
      display: 'block',
      left: '0',
      top: '0',
      content: "''",
    },
  },
  small: {
    height: '65vh',
    minHeight: '65vh',
    maxHeight: '650px',
  },
};

export default parallaxStyle;
