import express from 'express';
import getConfiguration from '../lib/getConfiguration.js';
import loadMockResponse from '../lib/loadMockResponse.js';

import getConfig from '../lib/apex/getConfig.js';
import getStatus from '../lib/apex/getStatus.js';
import getTLog from '../lib/apex/getTLog.js';
import getILog from '../lib/apex/getILog.js';
import triggerTridentTest from '../lib/apex/triggerTridentTest.js';

const config = getConfiguration();

function createApexRouter() {
  const router = express.Router();

  router.get('/config', async (req, res) => {
    if (config.apex.mockCalls) return res.json(loadMockResponse('/config.json'));
    res.json(await getConfig());
  });

  router.get('/status', async (req, res) => {
    if (config.apex.mockCalls) return res.json(loadMockResponse('/status.json'));
    res.json(await getStatus());
  });

  router.get('/tlog', async (req, res) => {
    if (config.apex.mockCalls) return res.json(loadMockResponse('/tlog.json'));
    res.json(await getTLog(req.query.startDay, req.query.numDays));
  });

  router.get('/ilog', async (req, res) => {
    if (config.apex.mockCalls) return res.json(loadMockResponse('/ilog.json'));
    res.json(await getILog(req.query.startDay, req.query.numDays));
  });

  router.put('/testRequest/:parameter', async (req, res) => {
    console.log(`Test request for ${req.params.parameter}`);
    if (config.apex.mockCalls) return res.json(loadMockResponse('/testRequest.json'));
    res.json(await triggerTridentTest(req.params.parameter));
  });

  return router;
}

export default createApexRouter;
