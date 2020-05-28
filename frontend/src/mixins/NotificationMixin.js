import { uuidv4 } from '../utils/StringUtils.js';

const NotificationMixin = {
data() {
    return {
        notifications: [],
        timeoutNotification: 25, // sec
        limitNotifications: 5,
    };
},

methods: {
    addNotification(notification) {
        const uuid = uuidv4();

        this.notifications.push({
            ...notification,
            uuid,
        });

        const lengthNotifications = this.notifications.length;

        if (lengthNotifications > this.limitNotifications) {
            this.notifications = this.notifications.slice(lengthNotifications - this.limitNotifications);
        }

        if (this.timeoutNotification > 0) {
            setTimeout(() => {
               this.removeNotification({ uuid });
            }, this.timeoutNotification * 1000);
        }
    },

    removeNotification({ uuid }) {
        this.notifications = this.notifications.filter(foundNotification => foundNotification.uuid !== uuid);
    }
}

};

export {NotificationMixin as default}
