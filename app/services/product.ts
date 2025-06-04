const baseUrl = 'https://not-contest-cdn.openbuilders.xyz/api';
async function sendRequest(url: string, method: string = 'GET') {
    const response = await fetch(baseUrl+url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

export async function getAllProducts() {
  const res = await sendRequest('/items.json', 'GET')
  console.log('Products fetched:', res.data);
  return res.data;
}
