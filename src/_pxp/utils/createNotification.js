
export const createNotification = (data, options = null) => {
  if (navigator.userAgent.includes('wv')) {
    // window.Mobile.showNotification(data.mensaje);
  } else {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then(function (reg) {
          reg.showNotification('Notificación', {
            icon: '/images/bell.png',
            body: data.mensaje,
          });
        }).catch(err => {
          console.warn(err);
          new Notification('Notificación', {
            icon: '/images/bell.png',
            body: data.mensaje,
          })
        });
    }
  }
}; 