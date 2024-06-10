import fetch from 'node-fetch';
import getConnectSid from './getConnectSid.js';

import getConfiguration from '../getConfiguration.js';

// may change per hw setup
const parameterValues = {
  'Alkalinity': {
    outputId: '2_4',
    name: 'Alk_2_4',
    did: 'Alk_2_4',
    id: 6,

  },
  'Combined': {
    outputId: '2_3',
    name: 'Trident_2_3',
    did: '2_3',
    id: 5
  }
};

async function triggerTridentTest(parameter) {
  const { connectSid } = await getConnectSid();
  const config = getConfiguration();
  const host = config.apex.host;
  if (!parameterValues.hasOwnProperty(parameter)) {
    throw Error(`Invalid parameter name: ${parameter}. Choose one of: [${Object.keys(parameterValues).join(', ')}]`);
  }
  const parameterValue = parameterValues[parameter];
  console.log(parameterValue);
  const url = `https://${host}/rest/status/outputs/${parameterValue.outputId}`;

  const response = fetch(url, {
    "headers": {
      "accept": "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-US,en;q=0.9",
      "accept-version": "1",
      "content-type": "application/json",
      "x-csrf-token": "undefined",
      "x-requested-with": "XMLHttpRequest",
      "cookie": `connect.sid=${connectSid}`,
      "Referer": `http://${host}/apex/dash`,
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": `{"status":["ON","","OK",""],"name":"${parameterValue.did}","gid":"","type":"selector","ID":${parameterValue.id},"did":"${parameterValue.did}"}`,
    "method": "PUT"
  });
  const body = await response.json();
  return body;
}

export default triggerTridentTest;
