function requestParameterHistory(parameterName, numDays) {
  return fetch(`http://${apexConfig.host}:${apexConfig.port}/parameter-history?parameterName=${parameterName}&numDays=${numDays}`);
}
