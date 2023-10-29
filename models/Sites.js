const mongoose = require('mongoose');
const User = require('../models/User')
const siteSchema = new mongoose.Schema({
  site_name: {
    type: String,
    required: true,
  },
  company_name: {
    type: String,
    required: true,
  },
  site_url: {
    type: String,
    required: true,
    minLength: 4,
    validate: {
      validator: function (value) {
        return /^(https?:\/\/)/.test(value);
      },
      message: 'Site URL must start with "https://" or "http://"',
    },
  },
  ownerId : {
    type: mongoose.Types.ObjectId,
    ref: User,
  },
  visitors : {
    type: Number,
    default : 1,
  }
});

siteSchema.post('validate', function (doc, next) {
  if (doc.errors) {
    const errorMessages = [];
    for (const field in doc.errors) {
      if (doc.errors.hasOwnProperty(field)) {
        errorMessages.push(doc.errors[field].message);
      }
    }
    doc.validationErrors = errorMessages; 
  }
  next();
});

const Site = mongoose.model('Site', siteSchema);

module.exports = Site;
