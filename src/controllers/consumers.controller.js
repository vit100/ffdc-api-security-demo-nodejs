const debug = require('debug')(__filename);
const consumersRepo= require('../data/consumersRepo');


module.exports = class ConsumersController {
 static getConsumers(req, res, next) {
    debug('ConsumersController.getConsumers invoked');
    res.send(consumersRepo.consumers());
    next();
  }
};


