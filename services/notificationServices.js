const User = require('../models/User');
async function createNotification(notificationData,userId) {


    class Notification{
        constructor(type,message,timing){
            this.type = type;
            this.message = message;
            this.timing = timing;
        }

        typeExists(){
            switch(this.type){
                case 'NOTIFICATION_ALERT':
                    return true;
                    break;
                case 'NOTIFICATION_WARNING':
                    return true;
                    break;
                default:
                    return {error: 'This notification is not valid !'}
            }
        }
    }
    try {

        const testNotification = new Notification(notificationData.type,notificationData.message,notificationData.timing);
        console.log(testNotification.typeExists(),'RESULT');
        const user = await User.findById(userId).exec();
        if (!user) {
            return { error: 'User not found' };
        }


        const notification_Send = user.notifications.push([{
            notifaction_type : notificationData.type,
            notification_message:notificationData.message,
            notification_timing : notificationData.timing
        }])
        await user.save();

        console.log('Notification Send!');
        return notification_Send;
    } catch (error) {
        console.error('Error sending notification:', error);
        return { error: 'An error occurred while creating the notification' };
    }
}


module.exports = {

    createNotification : createNotification,
}
