import { ENDPOINT, ENDPOINT_SPECIALTE, GET } from '../../config.js';

/**
 * Classe fournissant des services pour la gestion des spécialités des opérateurs
 */
export default class SpecialtyProvider {
    /**
     * Effectue une requête HTTP générique
     * @param {string} url - L'URL à interroger
     * @param {Object} http_request - La configuration de la requête (méthode, headers...)
     * @returns {Promise<Object|null>} Les données JSON ou null en cas d'erreur
     * @throws {Error} Si la réponse réseau n'est pas valide
     */
    static async fetchRequest(url, http_request) {
        try {
            const response = await fetch(url, http_request);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (err) {
            console.error('Fetch error:', err);
            return null;
        }
    }

    /**
     * Récupère toutes les spécialités disponibles
     * @returns {Promise<Array>} Un tableau de toutes les spécialités
     */
    static async getAllSpecialties() {
        return await this.fetchRequest(ENDPOINT_SPECIALTE, GET);
    }

    /**
     * Récupère les spécialités d'un opérateur spécifique
     * @param {number|string} operatorId - L'identifiant de l'opérateur
     * @returns {Promise<Array<string>>} Un tableau des noms de spécialités
     * 
     * @example
     * // Renvoie ["Assistance", "Anti-Intrusion"]
     * const specialties = await SpecialtyProvider.getSpecialtiesForOperator(2);
     */
    static async getSpecialtiesForOperator(operatorId) {
        try {
            const relations = await this.fetchRequest(
                `${ENDPOINT}/specialite_operateur`, 
                GET
            );
            
            if (!Array.isArray(relations)) return [];

            const specialties = await this.getAllSpecialties();
            if (!Array.isArray(specialties)) return [];

            return relations
                .filter(rel => parseInt(rel.operateur_id) === parseInt(operatorId))
                .map(rel => {
                    const spec = specialties.find(s => 
                        parseInt(s.id) === parseInt(rel.specialite_id)
                    );
                    return spec?.name;
                })
                .filter(Boolean);
                
        } catch (error) {
            console.error('Error getting operator specialties:', error);
            return [];
        }
    }
}