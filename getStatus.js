import * as url from 'node:url';
import fetch from 'node-fetch';
import login from './login.js';

async function getStatus(ipAddress, authOptions) {
  if (!authOptions.hasOwnProperty('connectSid')) {
    console.log('no connectSid. need to login');
    const loginResponse = await login(ipAddress, authOptions.username, authOptions.password);
    authOptions.connectSid = loginResponse.connectSid;
  }
  const response = await fetch(`http://${ipAddress}/rest/status?_=${Date.now()}`, {
    "headers": {
      "accept": "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-US,en;q=0.9",
      "accept-version": "1",
      "x-requested-with": "XMLHttpRequest",
      "cookie": `connect.sid=${authOptions.connectSid}`,
      "Referer": `http://${ipAddress}/apex/dash`,
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
  });
  const body = await response.json();
  return body;
}

if (import.meta.url.startsWith('file:')) {
  const modulePath = url.fileURLToPath(import.meta.url).split('.js')[0];
  const secondArg = process.argv[1].split('.js')[0];
  if (secondArg === modulePath) {
    const authOptions = {};
    if (process.argv.length === 4) {
      authOptions.connectSid = process.argv[3];
    } else {
      authOptions.username = process.argv[3];
      authOptions.password = process.argv[4];
    }
    getStatus(process.argv[2], authOptions).then(res => console.log(res));
  }
}

export default getStatus;
