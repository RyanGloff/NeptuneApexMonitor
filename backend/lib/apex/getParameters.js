import * as url from 'node:url';
import getStatus from './getStatus.js';

async function getParameters(ipAddress, authOptions) {
  const status = await getStatus(ipAddress, authOptions);
  const byKey = status.inputs.reduce((agg, curr) => {
      agg[curr.name] = curr.value;
      return agg;
    }, {}
  );
  return {
    temperature: byKey.Tmp,
    ph: byKey.pH,
    alkalinity: byKey.Alkx2,
    calcium: byKey.Cax2,
    magnesium: byKey.Mgx2
  };
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
    getParameters(process.argv[2], authOptions).then(res => console.log(res));
  }
}

export default getParameters;
