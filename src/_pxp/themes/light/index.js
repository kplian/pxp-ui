import { softShadows } from '../shadows';
import { colors } from '@material-ui/core';

export const LIGHT = {
  name: 'LIGHT',
  overrides: {
    MuiInputBase: {
      input: {
        '&::placeholder': {
          opacity: 1,
          color: colors.blueGrey[600]
        }
      }
    }
  },
  palette: {
    type: 'light',
    action: {
      active: colors.blueGrey[600]
    },
    background: {
      default: colors.common.white,
      dark: '#e3e3e3',
      paper: colors.common.white
    },
    primary: {
      main: colors.indigo[600]
    },
    secondary: {
      main: '#5850EC'
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600]
    }
  },
  shadows: softShadows
};