const User = require('../models/User');
async function createNotification(notificationData, userId) {
    class Notification {
        constructor(type, message, timing) {
            this.type = type;
            this.message = message;
            this.timing = timing;
        }

        // Some basic validation
        typeExists() {
            switch (this.type) {
                case 'NOTIFICATION_ALERT':
                    return true
                case 'NOTIFICATION_WARNING':
                    return true
                case 'NOTIFICATION_INFO':
                    return true;
                default:
                    return {
                        error: 'This notification is not valid!'
                    };
            }
        }


        getIcon(){

            const ICON_LIST = {
                'NOTIFICATION_ALERT' : `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell text-warning"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                `
            }

            return ICON_LIST[this.type];
        }
        messageIsValid() {
            return this.message.length >= 4 ?
                true :
                {
                    error: 'The message has to be at least 4 characters long'
                };
        }
    }

    try {
        const createNotification = new Notification(
            notificationData.type,
            notificationData.message,
            new Date()
        );


        if (!createNotification.typeExists().error) {
            if (createNotification.messageIsValid()) {
                const user = await User.findById(userId).exec();
                if (!user) {
                    return {
                        error: 'User not found'
                    };
                }

                const notify = {
                    notification_type: notificationData.type,
                    notification_message: notificationData.message,
                    notification_icon : createNotification.getIcon(),
                    notification_timing: new Date(),
                };

                user.notifications.push(notify);
                await user.save();

                console.log('Notification Sent!');
                return notify;
            }
        }
    } catch (error) {
        console.error('Error sending notification:', error);
        return {
            error: 'An error occurred while creating the notification'
        };
    }
}

async function getNotifications(userId){
    // check if user exists

    const user = await User.findById(userId).exec();

    if(!user){
        return {
            'error' : 'This user does not exist !'
        }
    }

    const notificationAmount = await user.notifications.length;

    return notificationAmount;
}

module.exports = {
    createNotification: createNotification,
    getNotifications : getNotifications,
};