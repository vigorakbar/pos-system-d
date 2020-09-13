const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

//simple schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    unique: true
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  //give different access rights if admin or not 
  isAdmin: Boolean
});


//custom method to generate authToken 
UserSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('secretkey'));
  return token;
}

const User = mongoose.model('User', UserSchema);

const USER_USERNAME_VALIDATION = Joi.string().min(3).max(50).required()
const USER_EMAIL_VALIDATION = Joi.string().min(5).max(255).required().email()
const USER_PASSWORD_VALIDATION = Joi.string().min(3).max(255).required()

//function to validate user
function validateUser(user) {
  const schema = Joi.object({
    username: USER_USERNAME_VALIDATION,
    email: USER_EMAIL_VALIDATION,
    password: USER_PASSWORD_VALIDATION
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
exports.USER_USERNAME_VALIDATION = USER_USERNAME_VALIDATION;
exports.USER_EMAIL_VALIDATION = USER_EMAIL_VALIDATION;
exports.USER_PASSWORD_VALIDATION = USER_PASSWORD_VALIDATION;
