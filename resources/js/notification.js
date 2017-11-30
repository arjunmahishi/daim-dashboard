const applicationServerPublicKey = 'BJZy3aVYrxbEKeEEqRReRPs_239ZUxj5LCm_E-LRiMrz47IA51VmCyC8A4XpvuaoY5hjYhJ8TT5eA5dEq7F0BZ8';
let isSubscribed = false;
let swRegistration = null;
let fcm_token = null;

var config = {
    apiKey: "AIzaSyB9t-wtDoOVgJpYS4Z0lCYHt-twsLBCVtk",
    authDomain: "daimler-notify.firebaseapp.com",
    databaseURL: "https://daimler-notify.firebaseio.com",
    projectId: "daimler-notify",
    storageBucket: "daimler-notify.appspot.com",
    messagingSenderId: "423946699965"
};


firebase.initializeApp(config);

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');


    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function subscribeUser() {
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    swRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: applicationServerKey
        })
        .then(function (subscription) {
            console.log('User is subscribed.');
            console.log(subscription);

            //            updateSubscriptionOnServer(subscription);

            isSubscribed = true;

        })
        .catch(function (err) {
            console.log('Failed to subscribe the user: ', err);
        });
}

function unsubscribeUser() {
    swRegistration.pushManager.getSubscription()
        .then(function (subscription) {
            if (subscription) {
                return subscription.unsubscribe();
            }
        })
        .catch(function (error) {
            console.log('Error unsubscribing', error);
        })
        .then(function () {
            //    updateSubscriptionOnServer(null);

            console.log('User is unsubscribed.');
            isSubscribed = false;

        });
}

function initializeNotifications() {

    // Set the initial subscription value
    swRegistration.pushManager.getSubscription()
        .then(function (subscription) {
            isSubscribed = !(subscription === null);

            //    updateSubscriptionOnServer(subscription);

            if (isSubscribed) {
                console.log('User IS subscribed.');
            } else {
                console.log('User is NOT subscribed.');
            }
        });
}


if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('Service Worker and Push is supported');

    navigator.serviceWorker.register('service-worker.js')
        .then(function (swReg) {
            console.log('Service Worker is registered', swReg);

            swRegistration = swReg;
            subscribeUser();
            initializeNotifications();
            requestPermission();
        })
        .catch(function (error) {
            console.error('Service Worker Error', error);
        });
} else {
    console.warn('Push messaging is not supported');
    pushButton.textContent = 'Push Not Supported';
}
//PUB:BJZy3aVYrxbEKeEEqRReRPs_239ZUxj5LCm_E-LRiMrz47IA51VmCyC8A4XpvuaoY5hjYhJ8TT5eA5dEq7F0BZ8
//PRIV:5tOi9dKR77pqY0uQ5H2PqQbR6YMG1c75A2XgR7izOcA


const messaging = firebase.messaging();

function requestPermission(){
    messaging.requestPermission()
    .then(function() {
        console.log('Notification permission granted.');
        console.log(messaging.getToken())
        fcm_token = messaging.getToken();
    })
    .catch(function(err) {
        console.log('Unable to get permission to notify.', err);
    });
}


function sendFCMToken(){
    let payload = {
        userID: "",
        fcm_token: fcm_token
    };

    if(fcm_token != null){
        $.post(endpoint, payload, (res)=>{
            console.log(res);
        })
    }
}