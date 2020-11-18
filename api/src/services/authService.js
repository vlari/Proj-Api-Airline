const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const env = require('../config/env');

exports.getHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

exports.isValidPassword = async (password, accountPassword) => {
  const isValid = await bcrypt.compare(password, accountPassword);

  return isValid;
};

exports.getSignedToken = (payload, privateKey) => {
  const token = jwt.sign(payload, privateKey, { expiresIn: '1h' });
  return token;
};

exports.getDecodedToken = (token, privateKey) => {
  const userToken = jwt.verify(token, privateKey);
  return userToken;
}

exports.getHashedKey = (payload) => {
  const secretKey = crypto.createHash('SHA256').update(`${payload.password}-${payload.createdAt}`).digest('hex');
  return secretKey;
};
