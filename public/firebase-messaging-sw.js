importScripts('https://www.gstatic.com/firebasejs/11.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.1.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDjCbOHqMDlr7Dm1EGKxWLqIffYYm4VMVQ",
  authDomain: "foodcourt-d1025.firebaseapp.com",
  projectId: "foodcourt-d1025",
  storageBucket: "foodcourt-d1025.firebasestorage.app",
  messagingSenderId: "215618704336",
  appId: "1:215618704336:web:ed82dac3a61881ab38dfd5",
  measurementId: "G-VYBL8RP6KS"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  // Extract notification details from payload
  const notificationTitle = payload.notification?.title || 'New Message';
  const notificationOptions = {
    body: payload.notification?.body || 'You have a new message',
    icon: '/icon.png', // Make sure this path points to your app's icon
    badge: '/badge.png', // Optional: Add a badge icon
    data: payload.data, // Pass through any additional data
    actions: [
      {
        action: 'open',
        title: 'Open App'
      }
    ]
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', function(event) {
  console.log('[firebase-messaging-sw.js] Notification click Received');

  event.notification.close();

  // This looks for any open windows/tabs with your app and focuses them
  // If none are open, it opens a new one
  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    })
    .then(function(clientList) {
      if (clientList.length > 0) {
        let client = clientList[0];
        for (let i = 0; i < clientList.length; i++) {
          if (clientList[i].focused) {
            client = clientList[i];
          }
        }
        return client.focus();
      }
      return clients.openWindow('/');
    })
  );
});