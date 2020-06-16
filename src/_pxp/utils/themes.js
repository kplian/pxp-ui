import config from '../../config';
const customThemes = {};
config.customThemes.forEach( theme => customThemes[theme] = theme );

export const THEMES = {
  LIGHT: 'LIGHT',
  ONE_DARK: 'ONE_DARK',
  KPLIAN: 'KPLIAN',
  ...customThemes
};
