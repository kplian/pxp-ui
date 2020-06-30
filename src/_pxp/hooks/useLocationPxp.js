import React, { useState, useEffect } from 'react';
import useGeolocation from 'react-hook-geolocation';
const useLocationPxp = () => {
  const [position, setPosition] = useState(null);
  const [webview, setWebview] = useState(false);
  const geolocation = useGeolocation();

  const handleGetCurrentPosition = () => {
    const isWebView = navigator.userAgent.includes('wv');
    if (isWebView && window.Mobile) {
      window.Mobile.getUserCurrentPosition();
      const current = localStorage.getItem('currentLocation');
      if (current) {
        const { lat, lng } = JSON.parse(current);
        setPosition({ lat, lng });
      }
      setWebview(!webview);
    } else {
      saveLocalStorage(geolocation.latitude, geolocation.longitude);
      setPosition({ lat: geolocation.latitude, lng: geolocation.longitude });
    }
  };

  const saveLocalStorage = (latitude, longitude) => {
    localStorage.setItem(
      'currentLocation',
      JSON.stringify({ lat: latitude, lng: longitude })
    );
  };

  useEffect(() => {
    handleGetCurrentPosition();
  }, [geolocation, webview]);
  return position;
};

export default useLocationPxp;