import { ENDPOINT_ARMES, ENDPOINT_CLASSE_ARME, GET } from '../../config.js';

/**
 * Classe fournissant des services pour la gestion des armes
 */
export default class WeaponProvider {

    /**
     * Effectue une requête HTTP générique
     * @param {string} url - L'URL cible
     * @param {Object} httpRequest - Configuration de la requête
     * @returns {Promise<Object|null>} Réponse JSON ou null
     */
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

    /**
     * Récupère une arme par son ID
     * @param {string|number} id - ID de l'arme
     * @returns {Promise<Object>} L'arme correspondante
     */
    static async getWeaponById(id) {
        return this.fetchRequest(`${ENDPOINT_ARMES}/${id}`, GET);
    }

    /**
     * Récupère une classe d'arme par son ID
     * @param {string|number} classId - ID de la classe
     * @returns {Promise<Object>} La classe d'arme
     * @example
     * // Renvoie { id: "0", nom: "Fusil d'assaut", principale: true }
     * const weaponClass = await WeaponProvider.getWeaponClassById(0);
     */
    static async getWeaponClassById(classId) {
        return this.fetchRequest(`${ENDPOINT_CLASSE_ARME}/${classId}`, GET);
    }
}