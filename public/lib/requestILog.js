function requestILog(startDay, numDays) {
  return fetch(`/api/apex/ilog?startDay=${startDay}&numDays=${numDays}`);
}
