import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getMessaging,
  onMessage,
  isSupported,
  getToken
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging.js";
import { isSupported as isSwSupported } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-sw.js";

(async function (window) {

  const registerServiceWorker = async () => {
    try {
      const swOptions = {
        type: "classic",
        scope: "/",
      };

      const sw = await window.navigator.serviceWorker.register(`/sw.js`, swOptions);

      return sw
        .update()
        .then((registration) => {
          return registration;
        })
        .catch((error) =>
          console.error("Can not update service worker", error)
        );
    } catch (error) {
      // Oops. Registration was unsucessfull
      console.error("Can not register service worker", error);
    }
  };

  const requestPermission = async (messaging) => {
    try {
      const permission = await window.Notification.requestPermission();

      if (permission === "granted") {
        const serviceWorkerRegistration = await registerServiceWorker();

        return getToken(messaging, {
          serviceWorkerRegistration,
          vapidKey: "BD22tvvjxdEvcMVEd3jBUsAsoyOPBOiQbIbmXsIvnLBAsEova-b1PCuGaVM0HlfyFuFHSuWbTphnPvR9KkYxgRM",
        })
          .then((token) => {
            // Generated a new FCM token for the client
            // You can send it to server, e.g. fetch('your.server/subscribe', { token });
            // And store it for further usages (Server, LocalStorage, IndexedDB, ...)
            // For example:
            window.localStorage.setItem("fcm_token", token);
            console.log("FCM Token:", token);
          })
          .catch((err) => {
            console.error("Unable to get FCM Token", err);
          });
      } else {
        console.error("Unable to grant permission", permission);
      }
    } catch (error) {
      console.error("Unable to request permission", error);
    }
  };

  const showNotification = (payload) => {
    const {
      // It's better to send notifications as Data Message to handle it by your own SDK
      // See https://firebase.google.com/docs/cloud-messaging/concept-options#notifications_and_data_messages
      data: { title, body, actionUrl, icon },
    } = payload;

    let image = icon

    // See https://developer.mozilla.org/docs/Web/API/Notification
    const notificationOptions = {
      body,
      icon,
      image,
      actions: ['button1', 'button2'],
    };
    const notification = new window.Notification(title, notificationOptions);

    notification.onclick = (event) => {
      event.preventDefault(); // prevent the browser from focusing the Notification's tab
      window.open(actionUrl, "_blank").focus();
    };
  };

  if (!isSupported()) {
      // Notification is not supported by the browser
    } else if (!isSwSupported()) {
      // Service Worker is not supported by the browser
    } else if (window.Notification.permission === "denied") {
      // Browser's notification permission is already blocked
    } else {

      const firebaseConfig = {
        apiKey: "AIzaSyB_g_0HldXYiFEe9pmEbftIeXzVjZV_NMo",
        authDomain: "segunda-webpush.firebaseapp.com",
        projectId: "segunda-webpush",
        storageBucket: "segunda-webpush.appspot.com",
        messagingSenderId: "911570949742",
        appId: "1:911570949742:web:39302efead790420d7b87f",
        measurementId: "G-WQ9KZGDFDV"
      };

      const checkIfTokenIsNotGeneratedBefore = () =>
        !window.localStorage.getItem("fcm_token");

      const app = initializeApp(
        firebaseConfig,
        "Give your APP a name, otherwise it will be '[DEFAULT]'"
      );

      const messaging = getMessaging(app);

      if (checkIfTokenIsNotGeneratedBefore()) {
        await requestPermission(messaging);
      }

      onMessage(messaging, (payload) => {
        // Notification received in foreground & is readey to be shown by the browser.
        // console.log(payload); to see available notification's data.
        // You can also handle different stuff such as analytics here.
        console.log("Foreground Message", payload);
        showNotification(payload);
      });
    }
})(window);
