/**
 * Light theme index file
 * @copyright Kplian Ltda 2020
 * @uthor Israel Colque
 */
import { colors } from '@material-ui/core';
import { softShadows } from '../shadows';

export default {
  name: 'PINK',
  overrides: {
    MuiInputBase: {
      input: {
        '&::placeholder': {
          opacity: 1,
          color: colors.blueGrey[600],
        },
      },
    },
    MuiIcon: {
      root:{
        fontFamily: 'Material Icons Outlined',
      }
    }
  },
  palette: {
    type: 'light',
    action: {
      active: colors.cyan[400],
    },
    background: {
      default: '#f4f6f8',
      dark: '#f4f6f8',
      paper: '#ffffff'
    },
    primary: {
      main: colors.pink[600],
      light: colors.pink[100],
      dark: colors.pink[800],
    },
    secondary: {
      main: colors.cyan[400],
      light: '#7efcff', 
      dark: '#0098a7'
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600],
    },
  },
  shadows: softShadows,
};
