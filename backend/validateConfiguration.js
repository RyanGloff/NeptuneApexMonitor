function validatePath(root, path, originalPath) {
  const pathArray = path.split('.');
  if (!root.hasOwnProperty(pathArray[0])) {
    throw new Error(`Invalid configuration. Path must exist: ${originalPath}`);
  }

  if (pathArray.length > 1) {
    validatePath(root[pathArray[0]], pathArray.slice(1).join('.'), originalPath || path);
  }
}

function validateConfiguration(config) {
  validatePath(config, 'apex.ipAddress');
  validatePath(config, 'apex.authOptions.username');
  validatePath(config, 'apex.authOptions.password');
  if (config.apex.hasOwnProperty('notifications')) {
    const notificationConfig = config.apex.notifications;
    validatePath(notificationConfig, 'distribution.service');
    validatePath(notificationConfig, 'distribution.email');
    validatePath(notificationConfig, 'distribution.password');
    validatePath(notificationConfig, 'receiving.email');
  }
}

export default validateConfiguration;
