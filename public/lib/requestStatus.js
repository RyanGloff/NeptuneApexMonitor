function requestStatus() {
  return fetch(`/api/apex/status`).then(handleApiResponse);
}
