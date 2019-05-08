const router = require('express').Router();

router.isHealthy = true;
router.isReady = true;

router.get('/healthz', (req, res) => {
  if (router.isHealthy) {
    res.sendStatus(200);
  } else {
    res.sendStatus('503');
    res.send('not healhty');
  }
});

router.get('/readyz', (req, res) => {
  if (router.isReady) {
    res.sendStatus(200);
  } else {
    res.sendStatus('503');
    res.send('not ready');
  }
});


module.exports = router;
