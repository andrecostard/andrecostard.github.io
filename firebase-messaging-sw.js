self.addEventListener('push', event => {
    const data = event.data.json();
    console.log('New notification', data);
    self.registration.showNotification(data.title, data.options);
})

self.addEventListener('notificationclick', event => {
    console.log('Notification clicked');
    event.notification.close();
    event.waitUntil(
        clients.openWindow('https://www.google.com')
    )
})