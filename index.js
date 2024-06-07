import express from 'express';
import getConfiguration from './lib/getConfiguration.js';
import createApiRouter from './api/createApiRouter.js';

const app = express();
const config = getConfiguration();
const port = config.server.port;

app.use('/static', express.static('public'));
app.use('/api', createApiRouter());

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
