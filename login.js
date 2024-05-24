import * as url from 'node:url';
import fetch from 'node-fetch';

async function login(ipAddress, username, password) {
  const response = await fetch(`http://${ipAddress}/rest/login`, {
    headers: {
      "accept": "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-US,en;q=0.9",
      "accept-version": "1",
      "content-type": "application/json",
      "x-csrf-token": "undefined",
      "x-requested-with": "XMLHttpRequest",
      "Referer": `http://${ipAddress}/`,
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    body: `{\"login\":\"${username}\",\"password\":\"${password}\",\"remember_me\":false}`,
    method: "POST"
  });
  const body = await response.json();
  return { 'connectSid': body['connect.sid'] };
}

if (import.meta.url.startsWith('file:')) {
  const modulePath = url.fileURLToPath(import.meta.url).split('.js')[0];
  const secondArg = process.argv[1].split('.js')[0];
  if (secondArg === modulePath) {
    login(process.argv[2], process.argv[3], process.argv[4]).then(res => console.log(res));
  }
}

export default login;
