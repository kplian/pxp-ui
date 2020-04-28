import React, {
  createContext,
  useState,
  useEffect,
  Suspense
} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
// import { THEMES } from 'src/constants';
import { storeSettings } from './settings-store';
import { ThemeProvider } from '@material-ui/core';
import { createTheme } from '../themes';
import { useTranslation } from 'react-i18next';

const THEMES = {
  LIGHT: 'LIGHT',
  ONE_DARK: 'ONE_DARK',
  KPLIAN: 'KPLIAN'
};

const defaultSettings = {
  direction: 'ltr',
  responsiveFontSizes: true,
  theme: THEMES.LIGHT,
  language: undefined,
  defaultLanguage: undefined
};
const SettingsContext = createContext({
  settings: defaultSettings,
  saveSettings: (updatedSettings) => {
    this.settings = updatedSettings;
  }
});

export function SettingsProvider({ settings, children }) {
  const { i18n } = useTranslation();
  const [currentSettings, setCurrentSettings] = useState({ ...(settings || defaultSettings), defaultLanguage:i18n.language });
  
  
  const handleSaveSettings = (updatedSettings = {}) => {
    const mergedSettings = _.merge({}, currentSettings, updatedSettings);
    if (mergedSettings.language !== i18n.language) {
      i18n.changeLanguage(mergedSettings.language);
    }
    
    setCurrentSettings(mergedSettings);
    storeSettings(mergedSettings);
    
    
    
    console.log('deff', mergedSettings, handleSaveSettings );
  };

  useEffect(() => {
    console.log('dir change');    
    document.dir = currentSettings.direction;
  }, [currentSettings]);

  

  return (    
    <SettingsContext.Provider
      value={{
        settings: currentSettings,
        saveSettings: handleSaveSettings
      }}
    > {console.log('render settings')}
      <ThemeProvider theme={createTheme(currentSettings)}>
        {children}
      </ThemeProvider>
    </SettingsContext.Provider>    
  );
}

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
  settings: PropTypes.object
};

export const SettingsConsumer = SettingsContext.Consumer;

export default SettingsContext;
