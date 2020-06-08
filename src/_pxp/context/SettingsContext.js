/**
 * Create Context for settings page
 * @copyright Kplian Ltda 2020
 * @uthor Jaime Rivera
 */
import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@material-ui/core';
import { storeSettings } from './settings-store';
import { createTheme } from '../themes';
import config from '../../config'

const THEMES = {
  LIGHT: 'LIGHT',
  PINK: 'PINK',
  ONE_DARK: 'ONE_DARK',
  KPLIAN: 'KPLIAN',
};

const defaultSettings = {
  direction: 'ltr',
  responsiveFontSizes: true,
  theme: config.defaultTheme || THEMES.LIGHT,
  language: undefined,
  defaultLanguage: undefined,
};
const SettingsContext = createContext({
  settings: defaultSettings,
  saveSettings: (updatedSettings) => {
    this.settings = updatedSettings;
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
  }, [currentSettings]);

  return (
    <SettingsContext.Provider
      value={{
        settings: currentSettings,
        saveSettings: handleSaveSettings,
      }}
    >
      {' '}
      <ThemeProvider theme={createTheme(currentSettings)}>
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
