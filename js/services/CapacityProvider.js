import { ENDPOINT_CAPACITES, GET } from '../config.js';

export default class CapacityProvider {
    static async fetchRequest(url, httpRequest) {
        try {
            const response = await fetch(url, httpRequest);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (err) {
            console.error('Fetch error:', err);
            return null;
        }
    }

    static async getCapacityById(id) {
        return this.fetchRequest(`${ENDPOINT_CAPACITES}/${id}`, GET);
    }
}