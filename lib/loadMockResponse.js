import fs from 'fs';

function loadMockResponse(fileName) {
  const fileContents = fs.readFileSync(`data/mockResponses${fileName}`);
  return JSON.parse(fileContents);
}

export default loadMockResponse;
