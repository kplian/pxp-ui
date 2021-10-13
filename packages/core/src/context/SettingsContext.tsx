/**
 * Create Context for settings page
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@mui/material';
import { storeSettings } from './settings-store';
import { createTheme } from '@pxp-ui/themes';
import Pxp from '../Pxp';
import { THEMES } from '../utils/themes';

const activeDark =
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;
const themeDefault = activeDark
  ? Pxp.config.darkTheme || THEMES.ONE_DARK
  : Pxp.config.defaultTheme || THEMES.LIGHT;

const defaultSettings: any = {
  direction: 'ltr',
  responsiveFontSizes: true,
  theme: themeDefault,
  language: undefined,
  defaultLanguage: undefined,
};
const SettingsContext = createContext({
  settings: defaultSettings,
  saveSettings (updatedSettings) {
    this['settings'] = updatedSettings;
  },
});

export function SettingsProvider({ settings, children }) {
  const { i18n } = useTranslation();
  const [currentSettings, setCurrentSettings] = useState({
    ...(settings || defaultSettings),
    defaultLanguage: i18n.language,
  });

  const handleSaveSettings = (updatedSettings = {}) => {
    const mergedSettings = _.merge({}, currentSettings, updatedSettings);
    if (mergedSettings.language !== i18n.language) {
      i18n.changeLanguage(mergedSettings.language);
    }

    setCurrentSettings(mergedSettings);
    storeSettings(mergedSettings);
  };

  useEffect(() => {
    document.dir = currentSettings.direction;
    const customThemes = Pxp.config.customThemesList || [];
    localStorage.setItem(
      'themes', 
      JSON.stringify({...THEMES, ...customThemes.reduce((prev, next: any)=>({...prev, [next.name]: next.name}), {})})
    );
  }, [currentSettings]);

  // console.log('[pross]', createTheme(currentSettings, config.customThemesList));
  return (
    <SettingsContext.Provider
      value={{
        settings: currentSettings,
        saveSettings: handleSaveSettings,
      }}
    >
      {' '}
      <ThemeProvider theme={createTheme(currentSettings, Pxp.config.customThemesList)}>
        {children}
      </ThemeProvider>
    </SettingsContext.Provider>
  );
}

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
  settings: PropTypes.object.isRequired,
};

export const SettingsConsumer = SettingsContext.Consumer;

export default SettingsContext;
