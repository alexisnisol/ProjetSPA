import { ENDPOINT, ENDPOINT_OPERATORS, GET } from '../config.js';

/**
 * Classe permettant de récupérer les données des opérateurs dans le json-server
 */
export default class OperatorProvider {

    /**
     * Effectue une requête fetch sur le json-server
     * @param {String} request La requête à effectuer au json-server
     * @param {*} http_request La méthode HTTP à utiliser : GET, POST, PUT, DELETE
     * @returns Le résultat de la requête fetch au format JSON.
     */
    static fetchRequest = async (request, http_request)  => {
         try {
              const response = await fetch(`${ENDPOINT_OPERATORS}${request}`, http_request)
              const json = await response.json();
              return json
         } catch (err) {
              console.log('Error getting documents', err)
         }
    }

    /**
     * Récupère les opérateurs
     * @param {Number} limit La limite d'éléments à récupérer
     * @returns Les opérateurs récupérés, limités à 10 par défaut
     */
    static fetchOperators = async (limit = 10) => {
        return await OperatorProvider.fetchRequest(`?_limit=${limit}`, GET)
    }

    /**
     * Méthode utile pour récupérer les opérateurs selon un filtre et une limite.
     * Des méthodes de tri spécifiques sont implémentées dans OperatorSortProvider.js.
     * @param {String} filter Le filtre à appliquer
     * @param {Number} limit La limite d'éléments à récupérer
     * @returns Les opérateurs récupérés, limités à 10 par défaut, triés selon le filtre
     */
    static fetchOperatorsBySort = async (filter, limit = 10) => {
        return await OperatorProvider.fetchRequest(`?_sort=${filter}&_limit=${limit}`, GET)
    }

    /**
     * Récupère les opérateurs en fonction de leur camp (Assaillant ou Défenseur).
     * 
     * @param {String} camp - Le camp des opérateurs à récupérer : "Assaillant", "Défenseur" ou "all" pour récupérer tous les opérateurs.
     * @param {Number} limit - Le nombre maximal d'opérateurs à récupérer. Par défaut, 10 opérateurs sont récupérés.
     * 
     * @returns {Array} - Un tableau d'opérateurs récupérés en fonction du camp et de la limite spécifiée.
     */
    static fetchOperatorsByCamp = async (camp, limit = 10) => {
        let query = (camp === "Assaillant" || camp === "Défense") ? `&camps=${camp}` : "";
        return await OperatorProvider.fetchRequest(`?_limit=${limit}${query}`, GET);
    }

    /**
     * Récupère un opérateur spécifique selon son id
     * @param {Number} id L'id de l'opérateur à récupérer
     * @returns L'opérateur récupéré, sous forme de JSON
     */
    static getOperator = async (id) => {
        return await OperatorProvider.fetchRequest(`/${id}`, GET)
    }

    static async getOperatorSpecialties(operatorId) {
        try {
            console.log(`Fetching specialties for operator: ${operatorId}`);
    
            const operator = await OperatorProvider.getOperator(operatorId);
            if (!operator) {
                console.error(`No operator found with ID: ${operatorId}`);
                return [];
            }
    
            console.log("Operator fetched:", operator);
    
            const specialites = await OperatorProvider.fetchRequest(`/specialite`, GET) ?? [];
            const specialiteOperateur = await OperatorProvider.fetchRequest(`/specialite_operateur`, GET) ?? [];
    
            if (!Array.isArray(specialites) || !Array.isArray(specialiteOperateur)) {
                console.error("Invalid data format received for specialties or relations.");
                return [];
            }
    
            console.log("Available specialties:", specialites);
            console.log("Operator-specialty relations:", specialiteOperateur);
    
            const operatorSpecialties = specialiteOperateur
                .filter(rel => rel.operateur_id == operatorId)
                .map(rel => specialites.find(spec => spec.id == rel.specialite_id)?.name)
                .filter(Boolean);
    
            console.log("Specialties found:", operatorSpecialties);
    
            return operatorSpecialties;
        } catch (error) {
            console.error("Error fetching operator specialties:", error);
            return [];
        }
    }

    /**
     * Met à jour un opérateur existant
     * @param {Number} id - L'ID de l'opérateur à mettre à jour
     * @param {Object} data - Les nouvelles données de l'opérateur
     * @returns {Promise} - La promesse de la requête PUT
     */
    static updateOperator = async (id, data) => {
        console.log("Envoi de la requête PUT pour l'opérateur", id);
        console.log("Données:", data);
        
        try {
            const response = await fetch(`${ENDPOINT_OPERATORS}/${id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            if (!response.ok) {
                throw new Error(`Erreur HTTP! Statut: ${response.status}`);
            }
    
            const result = await response.json();
            console.log("Réponse du serveur:", result);
            return result;
        } catch (error) {
            console.error("Erreur dans updateOperator:", error);
            throw error;
        }
    }
    
}