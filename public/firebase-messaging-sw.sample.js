importScripts('https://www.gstatic.com/firebasejs/7.13.1/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/7.13.1/firebase-messaging.js',
);

const config = {
  apiKey: 'FB_API_KEY',
  authDomain: 'FB_AUTH_DOMAIN',
  databaseURL: 'FB_DATA_BASE_URL',
  projectId: 'FB_PROJECT_ID',
  storageBucket: 'FB_STORAGE_BUCKET',
  messagingSenderId: 'FB_MESSAGING_SENDER_ID',
  appId: 'FB_APP_ID',
};

firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload,
  );

  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: '/images/bell.png',
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions,
  );
});

self.addEventListener('notificationclick', (event) => {
  console.log('notificationclick', event);
  return event;
});
