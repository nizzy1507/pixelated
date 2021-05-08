export async function getJSON(apiUrl) {
  const res = await fetch(apiUrl);
  const data = await res.json();
  return data;
}
