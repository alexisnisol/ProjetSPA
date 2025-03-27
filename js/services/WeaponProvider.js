import { ENDPOINT_ARMES, ENDPOINT_CLASSE_ARME, GET } from '../config.js';

export default class WeaponProvider {
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

    static async getWeaponById(id) {
        return this.fetchRequest(`${ENDPOINT_ARMES}/${id}`, GET);
    }

    static async getWeaponClassById(classId) {
        return this.fetchRequest(`${ENDPOINT_CLASSE_ARME}/${classId}`, GET);
    }
}