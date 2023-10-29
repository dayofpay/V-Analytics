const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  notification_type: {
    type: String,
    required: true,
  },
  notification_message: {
    type: String,
    required: true,
  },
  notification_timing: {
    type: Date,
    default: Date.now,
  },
});

module.exports = notificationSchema;
