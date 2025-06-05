import { sendRequest } from '../general';

export async function getHistory() {
    const res = await sendRequest('/history.json', 'GET')
    if (res.ok) {
        return res.data;
    }

    throw new Error(`Failed to fetch history: ${res.error}`);
}
