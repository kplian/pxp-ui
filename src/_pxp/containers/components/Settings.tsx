/**
 * Settings tooltip
 * @copyright Kplian Ltda 2020
 * @uthor Israel Colque
 */
import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { capitalCase } from 'change-case';
import { useTranslation } from 'react-i18next';
import {
  Badge,
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Popover,
  SvgIcon,
  Switch,
  TextField,
  Tooltip,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Settings as SettingsIcon } from '@material-ui/icons';
import useSettings from '../../hooks/useSettings';
import { startSetLanguage } from '../../actions/auth';
import { THEMES } from '../../utils/themes';

const LANGUAGES = {
  ENGLISH: 'en',
  SPANISH: 'es',
};

const useStyles = makeStyles((theme) => ({
  badge: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginTop: 10,
    marginRight: 5,
  },
  popover: {
    width: 320,
    padding: theme.spacing(2),
  },
}));

function Settings() {
  const classes = useStyles();
  const ref = useRef(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { settings, saveSettings } = useSettings();

  const [isOpen, setOpen] = useState(false);
  const [values, setValues] = useState({
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
    theme: settings.theme,
    language: settings.language || settings.defaultLanguage,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (field, value) => {
    setValues({
      ...values,
      [field]: value,
    });
  };

  const handleSave = () => {
    const { language } = values;
    if (settings.language !== language) {
      saveSettings(values);
      dispatch(startSetLanguage({ language })).then((errorMsg) => {
        if (errorMsg === 'success') {
          window.location.reload(false);
        }
      });
    }
    saveSettings(values);
  };

  return (
    <>
      <Tooltip title={t('settings1')}>
        <Badge
          color="secondary"
          variant="dot"
          classes={{ badge: classes.badge }}
        >
          <IconButton color="inherit" onClick={handleOpen} ref={ref}>
            <SvgIcon fontSize="small">
              <SettingsIcon />
            </SvgIcon>
          </IconButton>
        </Badge>
      </Tooltip>
      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        classes={{ paper: classes.popover }}
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
      >
        <Typography variant="h4" color="textPrimary">
          {t('settings')}
        </Typography>
        <Box mt={2} px={1}>
          <FormControlLabel
            control={
              <Switch
                checked={values.responsiveFontSizes}
                edge="start"
                name="direction"
                onChange={(event) =>
                  handleChange('responsiveFontSizes', event.target.checked)
                }
              />
            }
            label="Responsive font sizes"
          />
        </Box>
        <Box mt={2}>
          <TextField
            fullWidth
            label="Theme"
            name="theme"
            onChange={(event) => handleChange('theme', event.target.value)}
            select
            SelectProps={{ native: true }}
            value={values.theme}
            variant="outlined"
          >
            {Object.keys(THEMES).map((theme) => (
              <option key={theme} value={theme}>
                {capitalCase(theme)}
              </option>
            ))}
          </TextField>
        </Box>
        <Box mt={2}>
          <TextField
            fullWidth
            label="Language"
            name="language"
            onChange={(event) => handleChange('language', event.target.value)}
            select
            SelectProps={{ native: true }}
            value={values.language}
            variant="outlined"
          >
            {Object.keys(LANGUAGES).map((key) => (
              <option key={LANGUAGES[key]} value={LANGUAGES[key]}>
                {capitalCase(key)}
              </option>
            ))}
          </TextField>
        </Box>
        <Box mt={2}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleSave}
          >
            Save Settings
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default Settings;
