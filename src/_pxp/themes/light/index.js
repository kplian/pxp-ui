/**
 * Light theme index file
 * @copyright Kplian Ltda 2020
 * @uthor Israel Colque
 */
import { colors } from '@material-ui/core';
import { softShadows } from '../shadows';

export default {
  name: 'LIGHT',
  overrides: {
    MuiInputBase: {
      input: {
        '&::placeholder': {
          opacity: 1,
          color: colors.blueGrey[600],
        },
      },
    },
  },
  palette: {
    type: 'light',
    action: {
      active: colors.blueGrey[600],
    },
    background: {
      default: '#f4f6f8',
      dark: '#f4f6f8',
      paper: colors.common.white
    },
    primary: {
      main: colors.indigo[600],
    },
    secondary: {
      main: '#5850EC',
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600],
    },
  },
  shadows: softShadows,
};
