self.addEventListener('push', event => {
    const data = event.data.json();
    console.log('New notification', data);
    const options = {
        body: data.notification.body,
        icon: data.notification.image,
        image: data.notification.image,
    }
    self.registration.showNotification(data.notification.title, options);
})

// self.addEventListener('notificationclick', event => {
//     console.log('Notification clicked');
//     event.notification.close();
//     event.waitUntil(
//         clients.openWindow('https://www.google.com')
//     )
// })