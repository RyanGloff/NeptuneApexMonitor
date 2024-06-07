import fetch from 'node-fetch';
import getConnectSid from './getConnectSid.js';

import getConfiguration from '../getConfiguration.js';

async function getTLog(startDay, numDays) {
  const { connectSid } = await getConnectSid();
  const config = getConfiguration();
  const host = config.apex.host;
  const url = `http://${host}/rest/tlog?days=${numDays || 7}&sdate=${startDay}&_=${Date.now()}`;
  const response = await fetch(url, {
    "headers": {
      "accept": "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-US,en;q=0.9",
      "accept-version": "1",
      "x-requested-with": "XMLHttpRequest",
      "cookie": `connect.sid=${connectSid}`,
      "Referer": `http://${host}/apex/ilog`,
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
  });
  const body = await response.json();
  return body;
}

export default getTLog;
