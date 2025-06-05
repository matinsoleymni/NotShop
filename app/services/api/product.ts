import { sendRequest } from '../general';

export async function getAllProducts() {
    const res = await sendRequest('/items.json', 'GET')
    if (res.ok) {
        return res.data;
    }
    throw new Error(`Failed to fetch products: ${res.error}`);
}
