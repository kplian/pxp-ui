/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { forwardRef, useState } from 'react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import FacebookIcon from '../../icons/FacebookIcon';
import GoogleIcon from '../../icons/GoogleIcon';
import { startSocialLogin } from '../../actions/auth';
import useSettings from '../../context/useSettings';
import LoadButton from '@pxp-ui/components/LoadButton/LoadButton';

const SocialLogin = forwardRef(() => {
  const isWebView = navigator.userAgent.includes('wv');

  const userAgent = window.navigator.userAgent.toLowerCase();
  const safari = /safari/.test(userAgent);
  const ios = /iphone|ipod|ipad/.test(userAgent);

  const iOSWebView = ios && !safari;

  const [accessToken, setAccessToken] = useState('');
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [disableButtons, setDisableButtons] = useState({
    facebook: false,
    google: false,
  });
  const { settings } = useSettings();
  const dispatch: any = useDispatch();
  // call to native logins (facebook and google)
  const myWindow: any = window;
  const handleFacebookLogin = () => {
    if (myWindow.Mobile) {
      myWindow.Mobile.facebookLogin();
    } else if (myWindow.webkit && iOSWebView) {
      myWindow.webkit.messageHandlers.facebookLogin.postMessage({ data: '' });
    }
  };

  const handleGoogleLogin = () => {
    if (myWindow.Mobile) {
      myWindow.Mobile.googleLogin();
    } else if (myWindow.webkit && iOSWebView) {
      myWindow.webkit.messageHandlers.googleLogin.postMessage({ data: '' });
    }
  };

  // web login facebook and google
  const responseGoogle = (response) => {
    if (response && response.error) {
      console.log('CONTROLAR ERROR', response); // Mostrar menssage de error, deshabilitar button no funciona
      setDisableButtons({ ...disableButtons, google: true });
    } else {
      const { language } = settings;
      setLoadingScreen(true);
      const userLogued = {
        userId: response.getId(),
        token: response.getAuthResponse().id_token,
        name: response.profileObj.givenName,
        surname: response.profileObj.familyName,
        device: 'web',
        type: 'google',
        language,
        email: response.profileObj.email,
        urlPhoto: response.profileObj.imageUrl,
      };

      dispatch(startSocialLogin(userLogued)).then((errorMsg) => {
        if (errorMsg !== 'success') {
          setLoadingScreen(false);
        }
      });
    }
  };

  const responseFacebook = (response) => {
    setLoadingScreen(true);
    const { language } = settings;
    const userLogued: any = {
      userId: response.userID,
      token: response.accessToken,
      name: response.name.split(' ', 2)[0],
      surname: response.name.split(' ', 2)[1],
      device: 'web',
      type: 'facebook',
      language,
    };
    fetch(
      `https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=${response.accessToken}`,
    )
      .then((data) => data.json())
      .then((json) => {
        fetch(
          `https://graph.facebook.com/${response.userID}/picture?type=square`,
        )
          .then((data) => {
            userLogued.email = json.email;
            userLogued.urlPhoto = data.url;
            dispatch(startSocialLogin(userLogued)).then((errorMsg) => {
              if (errorMsg !== 'success') {
                setLoadingScreen(false);
              }
            });
          })
          .catch((e) => {
            console.log('error', e);
          });
      })
      .catch((e) => {
        console.log('error', e);
      });
  };

  if (!isWebView && !iOSWebView) {
    return (
      <>
        <div
          className="social-login-button-container"
          style={{ display: 'inline-flex', width: '104%' }}
        >
          <FacebookLogin
            appId={process.env.REACT_APP_FACEBOOK_KEY}
            callback={responseFacebook}
            disableMobileRedirect
            render={(renderProps) => (
              <LoadButton
                variant="contained"
                color="secondary"
                className="facebook-button"
                publishPermissions={['publish_actions']}
                readPermissions={['public_profile']}
                onClick={renderProps.onClick}
                startIcon={
                  <FacebookIcon
                    style={{ paddingTop: '8px' }}
                    width={'30'}
                    fill="#ffffff"
                  />
                }
                loading={loadingScreen}
              >
                Facebook
              </LoadButton>
            )}
          />

          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
            disabled={disableButtons.google}
            render={(renderProps) => (
              <LoadButton
                variant="contained"
                color="secondary"
                className="google-button"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={
                  <GoogleIcon
                    style={{ paddingTop: '8px' }}
                    width={'30'}
                    fill="#ffffff"
                  />
                }
                loading={loadingScreen}
              >
                <label>Google</label>
              </LoadButton>
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy="single_host_origin"
          />
        </div>
        {
          // loadingScreen && <LoadingScreen />
        }
      </>
    );
  }
  return (
    <>
      <div
        className="social-login-button-container"
        style={{ display: 'inline-flex', width: '104%' }}
      >
        <LoadButton
          variant="contained"
          color="secondary"
          className="facebook-button"
          publishPermissions={['publish_actions']}
          readPermissions={['public_profile']}
          onClick={handleFacebookLogin}
          startIcon={
            <FacebookIcon
              style={{ paddingTop: '8px' }}
              width={'30'}
              fill="#ffffff"
            />
          }
          loading={loadingScreen}
        >
          Facebook
        </LoadButton>

        <LoadButton
          variant="contained"
          color="secondary"
          className="google-button"
          onClick={handleGoogleLogin}
          startIcon={
            <GoogleIcon
              style={{ paddingTop: '8px' }}
              width={'30'}
              fill="#ffffff"
            />
          }
          loading={loadingScreen}
        >
          <label>Google</label>
        </LoadButton>
      </div>
    </>
  );
});

export default SocialLogin;
