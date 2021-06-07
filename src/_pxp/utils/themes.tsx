/* eslint-disable no-return-assign */
/* eslint-disable import/prefer-default-export */
import config from '../../config';

const customThemes = {};

const configThemes = config.customThemes || [];
configThemes.forEach((theme) => {
  customThemes[theme] = theme;
});

export const THEMES = {
  LIGHT: 'LIGHT',
  ONE_DARK: 'ONE_DARK',
  KPLIAN: 'KPLIAN',
  ...customThemes,
};
