/**
 * Module dependencies
 */
import mongoose, { Schema } from 'mongoose';
import crypto from 'crypto';

/**
 * A validation funtion for local strategy properties
 */
function validateLocalStrategyProperty(property) {
  return ((this.provider !== 'local' && !this.updated) || property.length);
}

/**
 * A validation function for local strategy password
 */
function validateLocalStrategyPassword(password) {
  return (this.provider !== 'local' || (password && password.length > 6));
}

/**
 * User Schema
 */
const UserSchema = new Schema({
  username: {
    type: String,
    unique: 'Username should be unique',
    required: 'Please fill in a username',
  },
  salt: String,
  password: {
    type: String,
    default: '',
    validate: [validateLocalStrategyPassword, 'Password should be longer'],
  },
  email: {
    type: String,
    trim: true,
    validate: [validateLocalStrategyProperty, 'Please fill in your email'],
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  language: { type: String },
  profile: {
    firstName: String,
    lastName: String,
    displayName: String,
    country: String,
    state: String,
    city: String,
    zip: String,
    address: String,
    sex: String,
    language: String,
    borndate: String,
    picture: String,
    header: String,
    sport: String,
  },
  provider: String,
  providerData: {},
  additionalProvidersData: {},
  tokens: [{
    expires: Date,
    source: {
      type: String,
      enum: ['web', 'mobile'],
      defaut: 'web',
    },
    token: String,
  }],
  roles: {
    type: [{
      type: String,
      enum: ['user', 'admin'],
    }],
    default: ['user'],
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
  /* Password Reset */
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function preSave(next) {
  if (this.password && this.password.length > 6) {
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    this.password = this.hashPassword(this.password);
  }

  next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function hashPassword(password) {
  if (this.salt && password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
  }
  return password;
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function authenticate(password) {
  return this.password === this.hashPassword(password);
};

/**
 * Find possible not used username
 */
UserSchema.statics.findUniqueUsername = function findUniqueUsername(username, suffix, callback) {
  const possibleUsername = username + (suffix || '');

  this.findOne({
    username: possibleUsername,
  }, (err, user) => {
    if (!err) {
      if (!user) {
        callback(possibleUsername);
      } else {
        return this.findUniqueUsername(username, (suffix || 0) + 1, callback);
      }
    } else {
      callback(null);
    }
  });
};

mongoose.model('User', UserSchema);
