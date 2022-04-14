import { Application } from './Application.js';
import { Notification } from './Notification.js';



window.onload = function() {

    try {
        const application = new Application();
        application.init();

    } catch (error) {
        const notification = new Notification(error.message);
        notification.display();
    }

};