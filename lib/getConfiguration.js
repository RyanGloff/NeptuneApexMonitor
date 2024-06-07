import fs from 'fs';
import yaml from 'yaml-js';

let configuration = null;

function getConfiguration() {
  if (configuration === null) {
    const fileContents = fs.readFileSync(process.argv[2], { encoding: 'utf8', flag: 'r' });
    configuration = yaml.load(fileContents);
  }

  return configuration;
}

export default getConfiguration;
