import { USER_SUBSCRIPTIONS } from "./in-memory-db";

const webpush = require('web-push');


export async function sendNewsletter(req, res) {

    console.log('Total subscriptions', USER_SUBSCRIPTIONS.length);

    const notificationPayload = {
        "notification": {
            "title": "Angular News",
            "body": "Newsletter Available!",
            "icon": "assets/main-page-logo-small-hat.png",
            "vibrate": [100, 50, 100],
            "data": {
                "dateOfArrival": Date.now(),
                "primaryKey": 1
            },
            "actions": [{
                "action": "explore",
                "title": "Go to the site"
            }]
        }
    };

    try {

        await Promise.all(USER_SUBSCRIPTIONS.map(sub =>
            webpush.sendNotification(sub, JSON.stringify(notificationPayload))
        ));
        res.status(200).json({ message: "sended notification successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "failed to send notification" });
    }
}

