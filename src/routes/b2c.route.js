const router = require('express').Router();
const AccountController = require('../controllers/account.controller');

router.get('/accounts',   AccountController.getAccounts);

module.exports = router;
