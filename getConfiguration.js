import fs from 'fs';
import yaml from 'js-yaml';

function getConfiguration() {
  const config = yaml.load(fs.readFileSync('configuration.yaml'));
  return config;
}

export default getConfiguration;
