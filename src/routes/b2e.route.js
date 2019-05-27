const router = require('express').Router();
const AccountController = require('../controllers/account.controller');
const ConsumersController = require('../controllers/consumers.controller');

router.get('/consumers', ConsumersController.getConsumers);

router.get('/accounts/:consumerId', AccountController.getAccountsById);

module.exports = router;
