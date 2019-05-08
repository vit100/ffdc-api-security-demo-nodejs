const router = require('express').Router();
const AccountController = require('../controllers/account.controller');
const ConsumersController = require('../controllers/consumers.controller');

router.get('/consumers', ConsumersController.getConsumers);

router.get('/accounts/:id', AccountController.getAccountsById);

module.exports = router;
