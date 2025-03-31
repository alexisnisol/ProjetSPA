import { ENDPOINT_GADGETS, GET } from '../../config.js';

/**
 * Classe fournissant des services pour la gestion des gadgets
 */
export default class GadgetProvider {

    /**
     * Effectue une requête HTTP générique
     * @param {string} url - L'URL à interroger
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
     * Récupère un gadget par son ID
     * @param {string|number} id - ID du gadget
     * @returns {Promise<Object>} Le gadget correspondant
     * @example
     * // Renvoie { id: "0", nom: "Grenade à Percussion", ... }
     * const gadget = await GadgetProvider.getGadgetById(0);
     */
    static async getGadgetById(id) {
        return this.fetchRequest(`${ENDPOINT_GADGETS}/${id}`, GET);
    }

    static async getAllGadgets() {
        try {
            const gadgets = await this.fetchRequest(ENDPOINT_GADGETS, GET);
            return gadgets || [];
        } catch (error) {
            console.error('Error in getAllGadgets:', error);
            return [];
        }
    }
}