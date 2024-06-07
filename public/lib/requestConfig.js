function requestStatus() {
  return fetch(`/api/apex/config`).then(handleApiResponse);
}
