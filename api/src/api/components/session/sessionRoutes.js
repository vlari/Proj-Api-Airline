const express = require('express');
const sessionController = require('./sessionController');
const authValidator = require('../../middleware/requestValidators/authValidator');

const router = express.Router();

const { signUp, signIn, forgotPassword, resetPassword } = sessionController;

router.route('/signup').post(authValidator.validateSignUp, signUp);
router.route('/signin').post(authValidator.validateSignIn, signIn);
router.route('/passwordforgot').post(authValidator.validateEmail, forgotPassword);
router.route('/passwordreset').post(authValidator.validatePassword, resetPassword);

module.exports = router;
