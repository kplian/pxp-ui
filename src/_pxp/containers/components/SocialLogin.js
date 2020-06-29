import React, { forwardRef, useState } from 'react';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import FacebookIcon from '../../icons/FacebookIcon';
import GoogleIcon from '../../icons/GoogleIcon';
import { startSocialLogin } from '../../actions/auth';

const SocialLogin = forwardRef(() => {
  const isWebView = navigator.userAgent.includes('wv');
  const [accessToken, setAccessToken] = useState('');
  const [loadingScreen, setLoadingScreen] = useState(false);
  const dispatch = useDispatch();
  // call to native logins (facebook and google)
  const handleFacebookLogin = () => {
    if (window.Mobile) {
      window.Mobile.facebookLogin();
    }
  };

  const handleGoogleLogin = () => {
    if (window.Mobile) {
      window.Mobile.googleLogin();
    }
  };
  
  // web login facebook and google
  const responseGoogle = (response) => {
    setAccessToken(response.accessToken);
    setLoadingScreen(true);
    const userLogued = {
      code: response.getAuthResponse().id_token,
      type: 'google',
      language: '',
      usuario: response.profileObj.email,
    };
    
    dispatch(startSocialLogin(userLogued)).then((errorMsg) => {
      if (errorMsg !== 'success') {
        setLoadingScreen(false);
      }
    });
    
  };

  const responseFacebook = (response) => {
    setLoadingScreen(true);
    const userLogued = {
      code: response.accessToken,
      type: 'facebook',
      language: '',
    };

    fetch(
      `https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=${response.accessToken}`,
    )
      .then((data) => data.json())
      .then((json) => {
        userLogued.usuario = json.email;
        dispatch(startSocialLogin(userLogued)).then((errorMsg) => {
          if (errorMsg !== 'success') {
            setLoadingScreen(false);
          }
        });
      })
      .catch(() => {
        // reject('ERROR GETTING DATA FROM FACEBOOK')
      });
  };
  if (isWebView) {
    return (
      <>
        <div
          className="social-login-button-container"
          style={{ display: 'inline-flex', width: '104%' }}
        >
          <Button
            variant="contained"
            color="secondary"
            className="facebook-button"
            onClick={(e) => handleFacebookLogin(e)}
            startIcon={
              <FacebookIcon
                style={{ paddingTop: '8px' }}
                width={30}
                fill="#ffffff"
              />
            }
          >
            Facebook
          </Button>

          <Button
            variant="contained"
            color="secondary"
            className="google-button"
            onClick={(e) => handleGoogleLogin(e)}
            startIcon={
              <GoogleIcon
                style={{ paddingTop: '8px' }}
                width={30}
                fill="#ffffff"
              />
            }
          >
            <label htmlFor="">Google</label>
          </Button>
        </div>
      </>
    );
  }
  return (
    <>
      <div
        className="social-login-button-container"
        style={{ display: 'inline-flex', width: '104%' }}
      >
        <FacebookLogin
          appId="1146525882368432"
          callback={responseFacebook}
          render={(renderProps) => (
            <Button
              variant="contained"
              color="secondary"
              className="facebook-button"
              publishPermissions={['publish_actions']}
              readPermissions={['public_profile']}
              onClick={renderProps.onClick}
              startIcon={
                <FacebookIcon
                  style={{ paddingTop: '8px' }}
                  width={30}
                  fill="#ffffff"
                />
              }
            >
              Facebook
            </Button>
          )}
        />

        <GoogleLogin
          clientId="432978383853-mb7fe7mtjecintms1lj9o7vml1l86erf.apps.googleusercontent.com"
          render={(renderProps) => (
            <Button
              variant="contained"
              color="secondary"
              className="google-button"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              startIcon={
                <GoogleIcon
                  style={{ paddingTop: '8px' }}
                  width={30}
                  fill="#ffffff"
                />
              }
            >
              <label htmlFor="">Google</label>
            </Button>
          )}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy="single_host_origin"
        />
      </div>
      {/*{loadingScreen && <LoadingScreen />}*/}
    </>
  );
});

export default SocialLogin;
