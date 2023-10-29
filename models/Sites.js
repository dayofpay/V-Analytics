const mongoose = require('mongoose');
const siteSchema = new mongoose.Schema({
  site_name: {
    type: String,
    required: true,
    minLength: 3,
  },
  company_name: {
    type: String,
    required: true,
    minLength: 10,
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
    type: mongoose.Types.ObjectId
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
