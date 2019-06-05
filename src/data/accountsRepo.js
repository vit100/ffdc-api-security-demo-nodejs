const accountsData = require('./accounts.json');

consumerAccounts = consumerUserName => {
  return accountsData.filter(a => a.consumerUserName === consumerUserName);
};

module.exports = {
  consumerAccounts
};
