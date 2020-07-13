import React, { forwardRef, useState } from 'react';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import FacebookIcon from '../../icons/FacebookIcon';
import GoogleIcon from '../../icons/GoogleIcon';
import { startSocialLogin } from '../../actions/auth';
import LoadingScreen from '../../components/LoadingScreen';
import useSettings from '../../hooks/useSettings';

const SocialLogin = forwardRef(() => {
  const isWebView = navigator.userAgent.includes('wv');
  
  const userAgent = window.navigator.userAgent.toLowerCase(),
    safari = /safari/.test( userAgent ),
    ios = /iphone|ipod|ipad/.test( userAgent );
  
  const iOSWebView = (ios && !safari);
  
  const [accessToken, setAccessToken] = useState('');
  const [loadingScreen, setLoadingScreen] = useState(false);
  const { settings } = useSettings();
  console.log(settings);
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
  };

  const responseFacebook = (response) => {
    setLoadingScreen(true);
    const { language } = settings;
    const userLogued = {
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
  if (isWebView || iOSWebView) {
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
          appId={process.env.REACT_APP_FACEBOOK_KEY}
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
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
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
