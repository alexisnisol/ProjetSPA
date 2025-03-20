import { ENDPOINT_OPERATORS, GET } from '../config.js'

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
     * Récupère un opérateur spécifique selon son id
     * @param {Number} id L'id de l'opérateur à récupérer
     * @returns L'opérateur récupéré, sous forme de JSON
     */
    static getOperator = async (id) => {
        return await OperatorProvider.fetchRequest(`/${id}`, GET)
    }
}