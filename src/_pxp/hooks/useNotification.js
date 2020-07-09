import React, { useState, useEffect } from 'react';
;
const useNotification = () => {
  const [notify, setNotify] = useState({ enable: false, error: true });


  const requestPermission = () => {
    return new Promise((resolve, reject) => {
      Notification.requestPermission().then((result) => {
        resolve(result);
      }).catch(err => reject(err));
    });
  };

  const requestPermissionMobile = async () => {
    return new Promise((resolve, reject) => {
      console.log('Ok')
      navigator.serviceWorker.ready.then(function (registration) {
        console.log('ODDDDDk')

        registration.showNotification('Vibration Sample', {
          body: 'Buzz! Buzz!',
          icon: '../images/touch/chrome-touch-icon-192x192.png',
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          tag: 'vibration-sample'
        });
        alert('ok');
        resolve();
      }).catch(err => alert(err));
    });
  }

  const getRequestPermission = async () => {
    if (!("Notification" in window)) {
      setNotify({
        ...notify,
        error: "This browser does not support web notification",
      });
    } else if (Notification.permission === 'granted') {
      setNotify({
        enable: true,
        error: null,
      });
    } else {
      try {
        const permission = await requestPermission();
        if (permission === 'granted') {
          await requestPermissionMobile();
          setNotify({
            enable: true,
            error: null,
          });
        } else {
          setNotify({
            enable: false,
            error: 'User denied Web Notification.',
          });
        }
      } catch (error) {
        setNotify({
          ...notify,
          error: error.message,
        });
      }
    }
  };
  useEffect(() => {
    console.log('AQUI NOTIFY');
    getRequestPermission();
  }, []);
  return { notify, getRequestPermission };
};

export default useNotification;