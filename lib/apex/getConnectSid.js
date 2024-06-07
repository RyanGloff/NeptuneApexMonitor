import fetch from 'node-fetch';
import getConfiguration from '../getConfiguration.js';
import loadMockResponse from '../loadMockResponse.js';

const config = getConfiguration();

let connectSid = null;
let lastLoginTime = 0;

async function getConnectSid() {
  if (config.apex.mockCalls) return loadMockResponse('/login.json');
  if (connectSid === null || Date.now() - lastLoginTime > (1000 * 60 * 60)) {
    const host = config.apex.host;
    const username = config.apex.username;
    const password = config.apex.password;

    console.log(`Attempting login with credentials. Username: ${username}, Password: ${password}`);
    const response = await fetch(`http://${host}/rest/login`, {
      headers: {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9",
        "accept-version": "1",
        "content-type": "application/json",
        "x-csrf-token": "undefined",
        "x-requested-with": "XMLHttpRequest",
        "Referer": `http://${host}/`,
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      body: `{\"login\":\"${username}\",\"password\":\"${password}\",\"remember_me\":false}`,
      method: "POST"
    });
    const body = await response.json();
    connectSid = body['connect.sid'];
    lastLoginTime = Date.now();
  }
  return { connectSid };
}

export default getConnectSid;
