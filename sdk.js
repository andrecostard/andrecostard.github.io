import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'
    
// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js'

// Add Firebase products that you want to use
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'


import { getMessaging, getToken, onMessage} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-messaging.js'



const firebaseConfig = {
    apiKey: "AIzaSyB_g_0HldXYiFEe9pmEbftIeXzVjZV_NMo",
    authDomain: "segunda-webpush.firebaseapp.com",
    projectId: "segunda-webpush",
    storageBucket: "segunda-webpush.appspot.com",
    messagingSenderId: "911570949742",
    appId: "1:911570949742:web:39302efead790420d7b87f",
    measurementId: "G-WQ9KZGDFDV"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging();

getToken(messaging, { vapidKey: "BD22tvvjxdEvcMVEd3jBUsAsoyOPBOiQbIbmXsIvnLBAsEova-b1PCuGaVM0HlfyFuFHSuWbTphnPvR9KkYxgRM" }).then((currentToken) => {
    if (currentToken) {
    console.log('current token for client: ', currentToken);
    // Send the token to your server and update the UI if necessary
    // ...
    } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
    }
}).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
});

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.onBackgroundMessage` handler.

onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    // ...
});