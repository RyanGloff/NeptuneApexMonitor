import getParameters from './getParameters.js';
import sendEmail from './sendEmail.js';
import getConfiguration from './getConfiguration.js';

function parameterIsMonitored(config, key) {
  const monitoredParameters = config.apex.notifications.monitoring.parameters
  return monitoredParameters.indexOf(key) >= 0;
}

function monitoredParameterHasChanged(config, old, fresh) {
  if (old === null) return false;
  let dirty = false;

  Object.keys(fresh).forEach(key => {
    if (!parameterIsMonitored(config, key)) return;

    if (fresh[key] !== old[key]) {
      dirty = true;
    }
  });

  return dirty;
}

export function startNotificationService() {
  const config = getConfiguration();
  let latestValues = null;

  const interval = setInterval(async () => {
    const parameters = await getParameters(
      config.apex.ipAddress,
      config.apex.authOptions
    );
    console.log(parameters);

    if (monitoredParameterHasChanged(config, latestValues, parameters)) {
      const time = (new Date()).toISOString();
      sendEmail(
        config.notifications.distribution,
        config.notifications.receiving.email,
        config.notifications.distribution.title || 'Parameters Changed Notification',
`${config.notifications.distribution.message}
Temp: ${parameters.temperature}
PH: ${parameters.ph}
Calcium: ${parameters.calcium}
Alkalinity: ${parameters.alkalinity}
Magnesium: ${parameters.magnesium}
This change was noticed at: ${time}`
      );

      latestValues = parameters;
    }

  }, config.apex.notifications.monitoring.pollRate || 5000);

  return {
    interval
  };
}

