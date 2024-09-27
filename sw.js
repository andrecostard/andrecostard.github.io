import {
    initializeApp
  } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'
  
  const firebaseConfig = {
    apiKey: "AIzaSyB_g_0HldXYiFEe9pmEbftIeXzVjZV_NMo",
    authDomain: "segunda-webpush.firebaseapp.com",
    projectId: "segunda-webpush",
    storageBucket: "segunda-webpush.appspot.com",
    messagingSenderId: "911570949742",
    appId: "1:911570949742:web:39302efead790420d7b87f",
    measurementId: "G-WQ9KZGDFDV"
  };
  
  const app = initializeApp(firebaseConfig);
  
  const messaging = getMessaging();
  
  
  self.addEventListener("push", function (event) {
    messaging.onBackgroundMessage((payload) => {
      const {
        data: { title, body, actionUrl, icon },
      } = payload;
  
      const notificationOptions = {
        body,
        icon,
        data: {
          actionUrl,
        },
      };
  
      const promiseChain = new Promise((resolve) => {
        self.registration
          .showNotification(title, notificationOptions)
          .then(() => resolve());
      });
  
      event.waitUntil(promiseChain);
    });
  });
  
  self.addEventListener("notificationclick", (event) => {
    const { notification } = event;
    const {
      data: { actionUrl },
    } = notification;
  
    event.notification.close();
  
    event.waitUntil(
      clients
        .matchAll({ type: "window", includeUncontrolled: true })
        .then((clientsArr) => {
          // If a Window tab matching the targeted URL already exists, focus that;
          const hadWindowToFocus = clientsArr.some((windowClient) => {
            windowClient.url === actionUrl
              ? (windowClient.focus(), true)
              : false;
          });
  
          // Otherwise, open a new tab to the applicable URL and focus it.
          if (!hadWindowToFocus) {
            return clients.openWindow(actionUrl);
          }
        })
    );
  });