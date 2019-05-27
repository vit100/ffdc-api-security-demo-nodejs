const router = require('express').Router();

const b2cRouter = require('./b2c.route');
const b2bRouter = require('./b2b.route');
const b2eRouter = require('./b2e.route');

router.use('/b2c', b2cRouter);
router.use('/b2b', b2bRouter);
router.use('/b2e', b2eRouter);

module.exports = router;

