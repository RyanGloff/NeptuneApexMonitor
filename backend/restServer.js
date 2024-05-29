import express from 'express';
import { fetchParameters } from './parameterStorage.js';

export function startRestServer(config) {
  if (!config.apex.hasOwnProperty('restServer'))
    return;

  const port = config.apex.restServer.port || 8080;
  const app = express();

  app.get('/status', (req, res) => {
    const latestParameters = fetchParameters('data/latestParameters.json');
    res.json(latestParameters);
  });

  app.listen(port, () => console.log(`Starting server on port ${port}`));
}



