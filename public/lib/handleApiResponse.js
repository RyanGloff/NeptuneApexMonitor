async function handleApiResponse(res) {
  if (!res.ok) {
    console.error(res);
    const body = res.text();
    throw new Error(`Command failed. Status: ${res.status}. ${body}`);
  }
  return await res.json();
}
