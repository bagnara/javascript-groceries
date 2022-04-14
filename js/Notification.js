export class Notification {


    constructor(message, milliseconds) {
        this.message = message;
        this.milliseconds = milliseconds ? milliseconds : 5000;
    }


    display() {
        const notification = document.createElement('span');
        notification.innerHTML = this.message;
        notification.classList.add('message', 'warning');
        
        const form = document.querySelector('.form');
        const formContainer = form.parentElement;
        formContainer.append(notification);


        setInterval(() => {
            notification.remove();

        }, this.milliseconds);

    }

}