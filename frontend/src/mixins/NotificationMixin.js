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
    addNotification(inputNotification) {
        const uuid = uuidv4();
        let notification = {
            id: uuid,
            userPic: (inputNotification.data.sender) ? inputNotification.data.sender.userPic : null,
            firstName: (inputNotification.data.sender) ? inputNotification.data.sender.firstName : null,
            lastName: (inputNotification.data.sender) ? inputNotification.data.sender.lastName : null,
            isHuman: true
        };
        if (inputNotification.data.notificationType === 'user.profile.image.updated') {
            notification.body = this.senderFullName(inputNotification) +
                        (inputNotification.data.sender.sex === 'f' ? 'сменила 1111 аватарку' : 'сменил аватарку');
        }
        if (inputNotification.data.notificationType === 'friendships.accepted') {
            notification.body = this.senderFullName(inputNotification) +
                        ('f' === inputNotification.data.sender.sex ? 'одобрила Вашу заявку в друзья' : 'одобрил Вашу заявку в друзья');
        }
        if (inputNotification.data.notificationType === 'friendships.denied') {
            notification.body = this.senderFullName(inputNotification) +
                        ('f' === inputNotification.data.sender.sex ? 'отклонила Вашу заявку в друзья' : 'отклонил Вашу заявку в друзья');
            }
        if (inputNotification.data.notificationType === 'community.post.created') {
            notification.isHuman = false;
            notification.body = `Сообщество <b class="community-name">${inputNotification.data.community.name}</b> опубликовало новый пост`;
            notification.primaryImage = inputNotification.data.community.primaryImage;
            }

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

    senderFullName(inputNotification) {
        return `${inputNotification.data.sender.firstName} ${inputNotification.data.sender.lastName} `;
    },

    removeNotification({ uuid }) {
        this.notifications = this.notifications.filter(foundNotification => foundNotification.uuid !== uuid);
    },

    transformDialogToNotification(data) {
        return {

        }
    }
}

};

export {NotificationMixin as default}
