import {ENDPOINT_OPERATORS, GET} from '../config.js'
import QueryBuilder from "./QueryBuilder.js";

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
    static fetchRequest = async (request, http_request) => {
        try {
            const response = await fetch(`${ENDPOINT_OPERATORS}${request}`, http_request);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (err) {
            console.log('Error getting documents', err);
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

    /**
     * Récupère les opérateurs par page. Par défaut, 10 opérateurs sont récupérés.
     * @param {*} page Le numéro de la page à récupérer
     * @param {*} limit Le nombre d'opérateurs à récupérer par page
     * @returns Les opérateurs récupérés
     */
    static fetchPagesOperators = async (page, limit = 10) => {
        return await OperatorProvider.fetchRequest(`?_page=${page}&_per_page=${limit}`, GET);
    }
}