import { startNotificationService } from './notificationService.js';
import { startRestServer } from './restServer.js';
import getConfiguration from './getConfiguration.js';
import validateConfiguration from './validateConfiguration.js';

const config = getConfiguration();
validateConfiguration(config);

const mockApexCalls = process.argv.indexOf('--mock-apex') >= 0;

startNotificationService(config, mockApexCalls);
startRestServer(config);
