export const createNotification = (data, options = null) => {
  if (navigator.userAgent.includes('wv')) {
    window.Mobile.showNotification(data.mensaje);
  } else {
    return new Notification('Notificación', {
      icon: '/images/bell.png',
      body: data.mensaje,
    });
  }
}; 