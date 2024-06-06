import express from 'express';

import getStatus from '../lib/apex/getStatus.js';
import getHistoricalData from '../lib/apex/getHistoricalData.js';

export function startRestServer(config) {
  if (!config.apex.hasOwnProperty('restServer')) {
    return;
  }

  const port = config.apex.restServer.port || 8080;
  const app = express();

  app.get('/status', async (req, res) => {
    const apexRes = await getStatus('192.168.1.57', { username: 'admin', password: '1234' });
    console.log(apexRes);
    res.json(apexRes);
  });

  app.get('/parameter-history', async (req, res) => {
    const startDay = req.query.startDay;
    if (!startDay) return res.sendStatus(400);
    const numDays = req.query.numDays;
    if (!numDays) return res.sendStatus(400);
    const apexRes = await getHistoricalData(
      '192.168.1.57',
      { username: 'admin', password: '1234' },
      { startDay: startDay, numDays: numDays }
    );
    console.log(apexRes);
    res.json(apexRes)
  });

  app.listen(port, () => console.log(`Starting server on port ${port}`));
}
