import express from 'express';
import getConfig from '../lib/apex/getConfig.js';
import getStatus from '../lib/apex/getStatus.js';
import getTLog from '../lib/apex/getTLog.js';

function createApexRouter() {
  const router = express.Router();

  router.get('/config', async (req, res) => {
    res.json(await getApexConfig());
  });

  router.get('/status', async (req, res) => {
    res.json(await getStatus());
  });

  router.get('/tlog', async (req, res) => {
    res.json(await getTLog(req.query.startDay, req.query.numDays));
  });

  return router;
}

export default createApexRouter;
