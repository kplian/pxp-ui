/* eslint-disable import/prefer-default-export */
/**
 * Themes index file
 * @copyright Kplian Ltda 2020
 * @uthor Israel Colque
 */
import _ from 'lodash';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import typography from './typography';
import LIGHT from './light';
import ONE_DARK from './dark';
import KPLIAN from './kplian';
import { THEMES } from '../utils/themes';
import config from '../../config';

const CUSTOM_THEMES = config.customThemesList || [];

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

const themeConfigs = [LIGHT, ONE_DARK, KPLIAN, ...CUSTOM_THEMES];

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
