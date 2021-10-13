/* eslint-disable no-return-assign */
/* eslint-disable import/prefer-default-export */
// import Pxp from '../Pxp';


const getCustomThemes = async () => {
  const customThemes = {};
  const Pxp = await import('../Pxp');
  const configThemes = Pxp.default.config.customThemes || [];
  configThemes.forEach((theme) => {
    customThemes[theme] = theme;
  });

  return customThemes;
}

export const getThemes = async () => ({
  LIGHT: 'LIGHT',
  ONE_DARK: 'ONE_DARK',
  KPLIAN: 'KPLIAN',
  ...(await getCustomThemes()),
});


export const THEMES = {
  LIGHT: 'LIGHT',
  ONE_DARK: 'ONE_DARK',
  KPLIAN: 'KPLIAN',
   ...getCustomThemes(),
};
