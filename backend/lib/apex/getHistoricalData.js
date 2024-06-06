import fetch from 'node-fetch';
import login from './login.js';

async function getHistoricalData(ipAddress, authOptions, options) {
  if (!authOptions.hasOwnProperty('connectSid')) {
    console.log('no connectSid. need to login');
    const loginResponse = await login(ipAddress, authOptions.username, authOptions.password);
    authOptions.connectSid = loginResponse.connectSid;
  }
  const url = `http://${ipAddress}/rest/tlog?days=${options.numDays || 7}&sdate=${options.startDay}&_=${Date.now()}`;
  console.log(url);
  const response = await fetch(url, {
    "headers": {
      "accept": "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-US,en;q=0.9",
      "accept-version": "1",
      "x-requested-with": "XMLHttpRequest",
      "cookie": `connect.sid=${authOptions.connectSid}`,
      "Referer": "http://192.168.1.57/apex/ilog",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
  });
  const body = await response.json();
  return body;
}

// if (import.meta.url.startsWith('file:')) {
//   getHistoricalData('192.168.1.57', { username: 'admin', password: '1234' }, {}).then(res => console.log(res));
// }

export default getHistoricalData;
