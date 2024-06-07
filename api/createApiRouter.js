import express from 'express';
import createApexRouter from './createApexRouter.js';
import getConnectSid from '../lib/apex/getConnectSid.js';
import getConfiguration from '../lib/getConfiguration.js';

function createApiRouter() {
  const config = getConfiguration();
  const router = express.Router();

  getConnectSid() // login prior to endpoints being exposed to ensure access
    .then(auth => {
      console.log(`Login successful. connectSid: ${auth.connectSid}`);
      router.use('/apex', createApexRouter());
    });

  return router;
}

export default createApiRouter;
