const debug = require('debug')(__filename);
const accountsRepo = require('../data/accountsRepo');

module.exports = class AccountController {
  static getAccounts(req, res, next) {
    debug('accountController.getAccounts invoked');
    res.send(accountsRepo.consumerAccounts(req.user.username));
    next();
  }

  static getAccountsById(req, res, next) {
    debug('accountController.getAccountsByConsumer invoked');
    res.send(accountsRepo.consumerAccounts(req.params.consumerId));
    next();
  }
};
