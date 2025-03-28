import { ENDPOINT_CAPACITES, GET } from '../config.js';

/**
 * Classe fournissant des services pour la gestion des capacités des opérateurs
 */
export default class CapacityProvider {
    
    /**
     * Effectue une requête HTTP générique
     * @param {string} url - L'URL à interroger
     * @param {Object} httpRequest - Configuration de la requête (méthode, headers...)
     * @returns {Promise<Object|null>} Les données JSON ou null en cas d'erreur
     * @throws {Error} Si la réponse réseau n'est pas valide
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
     * Récupère une capacité spécifique selon son ID
     * @param {string|number} id - L'identifiant de la capacité
     * @returns {Promise<Object>} La capacité correspondante
     * @example
     * // Renvoie { id: "0", nom: "ROBOTHÉONS V10", ... }
     * const capacity = await CapacityProvider.getCapacityById(0);
     */
    static async getCapacityById(id) {
        return this.fetchRequest(`${ENDPOINT_CAPACITES}/${id}`, GET);
    }
}