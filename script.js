const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/pwa/pwabuilder-sw.js", {
        scope: "/pwa/",
      });
      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        console.log("Service worker active");
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

// Example of how to trigger a push notification (for testing)
function sendTestNotification() {
  if ('Notification' in window && Notification.permission === 'granted') {
    // In a real app, this would come from a server push
    fetch('/pwa/send-push-notification', { // Replace with your backend endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: 'Test Notification',
        body: 'This is a test notification.',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/Clients/openWindow'
      })
    })
    .then(response => console.log('Push notification sent:', response))
    .catch(error => console.error('Error sending push notification:', error));
  } else if ('Notification' in window && Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        sendTestNotification(); // Try again after permission is granted
      }
    });
  } else {
    console.log('Notifications not supported or denied.');
  }
}


registerServiceWorker();
