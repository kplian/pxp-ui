import React, {
  createContext,
  useState,
  useEffect
} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
// import { THEMES } from 'src/constants';
import { storeSettings } from './settings-store';
import { ThemeProvider } from '@material-ui/core';
import { createTheme } from '../themes';

const THEMES = {
  LIGHT: 'LIGHT',
  ONE_DARK: 'ONE_DARK',
  KPLIAN: 'KPLIAN'
};

const defaultSettings = {
  direction: 'ltr',
  responsiveFontSizes: true,
  theme: THEMES.LIGHT
};
const SettingsContext = createContext({
  settings: defaultSettings,
  saveSettings: (updatedSettings) => {
    this.settings = updatedSettings;
  }
});

export function SettingsProvider({ settings, children }) {
  const [currentSettings, setCurrentSettings] = useState(settings || defaultSettings);

  const handleSaveSettings = (updatedSettings = {}) => {
    const mergedSettings = _.merge({}, currentSettings, updatedSettings);

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
    >
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
