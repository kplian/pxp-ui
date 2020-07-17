/**
 * Login dialog will be called from login page and also when session expires
 * @copyright Kplian Ltda 2020
 * @uthor Israel Colque
 */
import React, {useState, useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Link from '@material-ui/core/Link';
import {useSelector, useDispatch} from 'react-redux';
import Typography from '@material-ui/core/Typography';
import {FormHelperText, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useTranslation} from 'react-i18next';
import {useHistory} from 'react-router-dom';

import * as Yup from 'yup';
import Pxp from '../../../Pxp';
import Form from '../../components/Form/Form';
import LoadingScreen from '../../components/LoadingScreen';
import {startLogin} from '../../actions/auth';
import useSettings from '../../hooks/useSettings';
import SocialLogin from './SocialLogin';

const useStyles = makeStyles({
  formLogin: {
    '& button': {
      height: '56px',
      width: '100%',
    },
  },
  separatorP: {
    width: '100%',
    textAlign: 'center',
    borderBottom: '1px solid #e0e0e0',
    lineHeight: '.1em',
    fontWeight: '500',
    margin: '30px 0 30px 0',
  },
  separatorSpan: {
    padding: '0 10px',
    color: '#606060',
    background: '#fff',
    fontSize: '14px',
  },
  signUpButton: {
    width: '80%',
    margin: 'auto',
    marginBottom: '20px',
    textAlign: 'center',
  },
  socialAndButtonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default ({open: popen, username}) => {
  const {settings} = useSettings();
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [open] = React.useState(popen);
  const [error, setError] = React.useState('');
  const sessionDied = useSelector((state) => state.auth.sessionDied);
  const dispatch = useDispatch();
  const classes = useStyles();
  const {t} = useTranslation();
  const history = useHistory();
  
  const handleLogin = (login, password) => {
    const {language} = settings;
    dispatch(startLogin({login, password, language})).then((errorMsg) => {
      if (errorMsg !== 'success') {
        setError(errorMsg);
        setLoadingScreen(false);
      }
    });
  };
  
  useEffect(() => {
    if (!sessionDied && !!username) {
      setLoadingScreen(false);
    }
  }, [sessionDied, loadingScreen, username]);
  
  const handleClose = () => {
  };
  
  const isWebView = navigator.userAgent.includes('wv');
  
  const userAgent = window.navigator.userAgent.toLowerCase(),
    safari = /safari/.test(userAgent),
    ios = /iphone|ipod|ipad/.test(userAgent);
  
  const handleDownloadApk = (e) => {
    
  };
  
  const iOSWebView = (ios && !safari);
  
  const userForm = {
    columns: {
      username: {
        type: 'TextField',
        label: t('username'),
        autoFocus: true,
        initialValue: username || '',
        disabled: !!username,
        gridForm: {xs: 12, sm: 12},
        variant: 'outlined',
        validate: {
          shape: Yup.string().required(t('username_required')),
        },
      },
      password: {
        type: 'TextField',
        typeTextField: 'password',
        label: t('password'),
        initialValue: '',
        gridForm: {xs: 12, sm: 12},
        variant: 'outlined',
        autoFocus: !!username,
        validate: {
          shape: Yup.string().required(t('required')),
        },
      },
    },
    resetButton: false,
    submitLabel: t('login'), // this is optional
    onEnterSubmit: true,
    onSubmit: ({values}) => {
      setLoadingScreen(true);
      handleLogin(values.username, values.password);
    },
  };
  
  return (
    <>
    <Dialog
      open={open || sessionDied}
      onClose={handleClose}
      aria-labelledby="login-dialog-title"
    >
      <DialogTitle id="login-dialog-title">
        <Typography variant="h4" component="span">
          {t('sign_in_app', {application: Pxp.config.applicationName})}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <div className={classes.formLogin}>
          <Form data={userForm} dialog/>
          {error && <FormHelperText error>{error}</FormHelperText>}
          {Pxp.config.accountManagement &&
          Pxp.config.accountManagement.recoverPassword && (
            <Link href="/forgot">{t('forgot_password')}?</Link>
          )}
        </div>
        <div className={classes.socialAndButtonsContainer}>
          {Pxp.config.accountManagement &&
          Pxp.config.accountManagement.socialLogin && (
            <>
            {!isWebView && !iOSWebView
              ?
              <p className={classes.separatorP}>
                    <span className={classes.separatorSpan}>
                      {t('or_login_with')}
                    </span>
              </p>
              :
              <></>
            }
            <SocialLogin />
            </>
          )}
          {Pxp.config.accountManagement &&
          Pxp.config.accountManagement.signup && (
            <>
            <p className={classes.separatorP}>
                    <span className={classes.separatorSpan}>
                      {t('new_to', {application: Pxp.config.applicationName})}
                    </span>
            </p>
            
            {!isWebView && !iOSWebView
              ?
              <Button
                variant="outlined"
                color="secondary"
                className=""
                style={{width: "75%", height: "50px"}}
                onClick={() => {
                  history.push('/vouz.apk');
                }}
                disabled={false}
              
              >
                <label htmlFor="">Descarga nuestra Aplicacion para android</label>
              </Button>
              
              :
              <></>
            }
            
            <br/>
            <br/>
            <Button
              variant="outlined"
              className={classes.signUpButton}
              color="primary"
              onClick={() => {
                history.push('/signup');
              }}
            >
              {t('signup')}
            </Button>
            {Pxp.config.accountManagement &&
            Pxp.config.accountManagement.termsOfService && (
              <Link href={Pxp.config.accountManagement.termsOfService}>
                Terminos del Servicio
              </Link>
            )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
    {loadingScreen && <LoadingScreen />}
    </>
  );
};
