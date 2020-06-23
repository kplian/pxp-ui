import React, { forwardRef } from 'react';
import { Button } from '@material-ui/core';
import FacebookIcon from '../../icons/FacebookIcon';
import GoogleIcon from '../../icons/GoogleIcon';

const SocialLogin = forwardRef(() => {
  let webViewClient = '';

  const { standalone } = window.navigator;
  const userAgent = window.navigator.userAgent.toLowerCase();
  const safari = /safari/.test(userAgent);
  const ios = /iphone|ipod|ipad/.test(userAgent);

  if (ios) {
    if (!standalone && safari) {
      webViewClient = 'Safari';
    } else if (!standalone && !safari) {
      webViewClient = 'iOSWebView';
    }
  } else if (userAgent.includes('wv')) {
    webViewClient = 'AndroidWebView';
  } else {
    webViewClient = 'RegularBrowser';
  }

  const handleFacebookLogin = () => {
    if (window.Mobile) {
      window.Mobile.facebookLogin();
      // return false;
    }
  };

  const handleGoogleLogin = () => {
    if (window.Mobile) {
      window.Mobile.googleLogin();
      // return false;
    }
  };

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
          onClick={handleFacebookLogin()}
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
          onClick={handleGoogleLogin()}
          startIcon={
            <GoogleIcon
              style={{ paddingTop: '8px' }}
              width={30}
              fill="#ffffff"
            />
          }
        >
          Google
        </Button>
      </div>
    </>
  );
});

export default SocialLogin;
