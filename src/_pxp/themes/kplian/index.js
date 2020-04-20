import { strongShadows } from '../shadows';

export const KPLIAN = {
  name: 'KPLIAN',
  palette: {
    type: 'dark',
    action: {
      active: 'rgba(255, 255, 255, 0.54)',
      hover: 'rgba(255, 255, 255, 0.04)',
      selected: 'rgba(255, 255, 255, 0.08)',
      disabled: 'rgba(255, 255, 255, 0.26)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
      focus: 'rgba(255, 255, 255, 0.12)'
    },
    background: {
      default: '#2a2d3d',
      dark: '#222431',
      paper: '#2a2d3d'
    },
    primary: {
      main: '#e55a47'
    },
    secondary: {
      main: '#f99201'
    },
    text: {
      primary: '#f6f5f8',
      secondary: '#9699a4'
    }
  },
  shadows: strongShadows
};