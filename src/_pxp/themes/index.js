/**
 * Themes index file
 * @copyright Kplian Ltda 2020
 * @uthor Israel Colque
 */
import _ from 'lodash';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import typography from './typography';
import LIGHT from './light';
import ONE_DARK from './dark';
import KPLIAN from './kplian';
import PINK from './pink';

export const THEMES = {
  LIGHT: 'LIGHT',
  PINK: 'PINK',
  ONE_DARK: 'ONE_DARK',
  KPLIAN: 'KPLIAN',
};

const baseConfig = {
  direction: 'ltr',
  typography,
  overrides: {
    MuiLinearProgress: {
      root: {
        borderRadius: 3,
        overflow: 'hidden',
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: 32,
      },
    },
    MuiChip: {
      root: {
        backgroundColor: 'rgba(0,0,0,0.075)',
      },
    },
  },
};

const themeConfigs = [LIGHT, ONE_DARK, KPLIAN, PINK];

export function createTheme(settings = {}) {
  let themeConfig = themeConfigs.find((theme) => theme.name === settings.theme);

  if (!themeConfig) {
    // eslint-disable-next-line no-console
    console.warn(new Error(`The theme ${settings.theme} is not valid`));
    [themeConfig] = themeConfigs;
  }

  let theme = createMuiTheme(
    _.merge({}, baseConfig, themeConfig, { direction: settings.direction }),
  );

  if (settings.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
}
