const express = require('express');
const accountController = require('./accountController');
const auth = require('../../middleware/auth');
const accountValidator = require('../../middleware/requestValidators/accountValidator');

const router = express.Router();

const {
  getAccountDetails,
  getDocumentTypes,
  getAccountAddresses,
  updateAccount,
  updatePassword,
} = accountController;

router
  .route('/accounts')
  .get(auth.guard, getAccountDetails)
  .put(auth.guard, updateAccount);

router
  .route('/accounts/password')
  .put(auth.guard, accountValidator.validatePassword, updatePassword);

router.route('/accounts/documenttypes').get(auth.guard, getDocumentTypes);
router.route('/accounts/addresses').get(auth.guard, getAccountAddresses);

module.exports = router;
