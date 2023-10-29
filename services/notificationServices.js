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
        case 'NOTIFICATION_ALERT': return true
        case 'NOTIFICATION_WARNING': return true
        case 'NOTIFICATION_INFO': return true;
        default:
          return { error: 'This notification is not valid!' };
      }
    }

    messageIsValid() {
      return this.message.length >= 4
        ? true
        : { error: 'The message has to be at least 4 characters long' };
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
          return { error: 'User not found' };
        }

        const notify = {
          notification_type: notificationData.type,
          notification_message: notificationData.message,
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
    return { error: 'An error occurred while creating the notification' };
  }
}

module.exports = {
  createNotification: createNotification,
};
