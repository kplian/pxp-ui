
export const createNotification = (data, options = null) => {
  if (navigator.userAgent.includes('wv')) {
    window.Mobile.showNotification(data.mensaje);
  } else {
    navigator.serviceWorker.register('service-worker.js')
      .then(function (reg) {
        reg.showNotification('Notificación', {
          icon: '/images/bell.png',
          body: data.mensaje,
        });
      });
  }
}; 