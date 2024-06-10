function triggerTridentTest(parameterName) {
  return fetch(`/api/apex/testRequest/${parameterName}`, { method: 'PUT' });
}
