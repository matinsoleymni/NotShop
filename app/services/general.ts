const baseUrl = 'https://not-contest-cdn.openbuilders.xyz/api';
export async function sendRequest(url: string, method: string = 'GET') {
    const response = await fetch(baseUrl+url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}
