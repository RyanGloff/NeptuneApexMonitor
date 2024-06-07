function requestTLog(startDay, numDays) {
  return fetch(`/api/apex/tlog?startDay=${startDay}&numDays=${numDays}`);
}
