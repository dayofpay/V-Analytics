const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    minLength: 10,
  },
  password: {
    type: String,
    required: true,
    minLength: 4,
  },
  repeatPassword: {
    type: String,
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: 'Repeat password should be equal to the password.',
    },
  },
  company : {
    type: String,
    required: true,
  },
  sites : {
    type : Array
  }
});
userSchema.post('validate', function (doc, next) {
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
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }

  this.repeatPassword = undefined;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
