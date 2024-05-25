import fs from 'fs';

export function storeParameters(fileName, parameters) {
  try {
    fs.writeFileSync(fileName, JSON.stringify(parameters));
  } catch (err) {
    console.error(`Failed to store parameters: ${err}`);
  }
}

export function fetchParameters(fileName) {
  let content = null;
  try {
    content = fs.readFileSync(fileName);
  } catch (err) {
    console.error(`Failed to write parameters: ${err}`);
  }
  return JSON.parse(content);
}
