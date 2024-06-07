import fetch from 'node-fetch';
import getConnectSid from './getConnectSid.js';
import getConfiguration from '../getConfiguration.js';

const config = getConfiguration();

let latestResult = null;
let latestResultTime = 0;

async function getConfig() {
  if (latestResult !== null && Date.now() - latestResultTime < (5 * 60 * 1000)) {
    return latestResultTime;
  }

  const { connectSid } = await getConnectSid();
  const host = config.apex.host;
  const response = await fetch(`http://${host}/rest/config?_=${Date.now()}`, {
    "headers": {
      "accept": "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-US,en;q=0.9",
      "accept-version": "1",
      "x-requested-with": "XMLHttpRequest",
      "cookie": `connect.sid=${connectSid}`,
      "Referer": `http://${host}/apex/dash`,
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
  });
  console.log(response);
  const body = await response.json();
  console.log(JSON.stringify(body));
  latestResult = body;
  latestResultTime = Date.now();
  return body;
}

export default getConfig;
