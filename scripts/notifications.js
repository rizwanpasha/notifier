var options = {
    "type": "basic",
    "title": "demo",
    "message": "first notifications demo",
    "iconUrl": "../remindme_action.png"
};

function notificationsCb() {
    console.log("logged");
}

function log() {
   // chrome.notifications.create(options, notificationsCb);
}