export const createNotification = (data, options = null) => {
  return new Notification('Notificacion', {
    icon: '/images/bell.png',
    body: data.mensaje,
  });
}; 