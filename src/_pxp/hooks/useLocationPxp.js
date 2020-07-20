import React, { useState, useEffect } from 'react';
import useGeolocation from 'react-hook-geolocation';

const useLocationPxp = () => {
  const [position, setPosition] = useState({
    lat: null,
    lng: null,
    error: true,
  });
  const [webview, setWebview] = useState(false);
  // const geolocation = useGeolocation();

  const getCoordinates = () => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const getLocation = async () => {
    if (navigator.geolocation) {
      try {
        const {
          coords: { latitude, longitude },
        } = await getCoordinates();
        setPosition({
          lat: latitude,
          lng: longitude,
          error: null,
        });
      } catch (error) {
        setPosition({
          ...position,
          error: error.message,
        });
      }
    } else {
      setPosition({
        ...position,
        error: 'Geolocation is not supported by this browser.',
      });
    }
  };

  const handleGetCurrentPosition = () => {
    const isWebView = navigator.userAgent.includes('wv');

    const userAgent = window.navigator.userAgent.toLowerCase();
    const safari = /safari/.test(userAgent);
    const ios = /iphone|ipod|ipad/.test(userAgent);

    const iOSWebView = ios && !safari;

    if (isWebView && window.Mobile) {
      window.Mobile.getUserCurrentPosition();
      setTimeout(() => {
        const current = localStorage.getItem('currentLocation');
        if (current) {
          const { lat, lng } = JSON.parse(current);
          setPosition({ lat, lng, error: null });
        } else {
          setPosition({
            ...position,
            error: 'User denied GeoLocation.',
          });
        }
      }, 100);
    } else if (iOSWebView && window.webkit) {
      window.webkit.messageHandlers.getUserCurrentPosition.postMessage({
        data: '',
      });
      setTimeout(() => {
        const current = localStorage.getItem('currentLocation');
        if (current) {
          const { lat, lng } = JSON.parse(current);
          setPosition({ lat, lng, error: null });
        } else {
          setPosition({
            ...position,
            error: 'User denied GeoLocation.',
          });
        }
      }, 1000);
    } else {
      getLocation();
    }
  };

  const saveLocalStorage = (latitude, longitude) => {
    localStorage.setItem(
      'currentLocation',
      JSON.stringify({ lat: latitude, lng: longitude }),
    );
  };

  useEffect(() => {
    handleGetCurrentPosition();
  }, []);
  return { position, handleGetCurrentPosition };
};

export default useLocationPxp;
