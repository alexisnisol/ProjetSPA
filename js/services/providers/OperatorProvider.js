import {ENDPOINT_OPERATORS, GET} from '../../config.js'
import SpecialtyProvider from './SpecialityProvider.js'
import QueryBuilder from "../QueryBuilder.js";

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
     * Effectue une requête fetch sur le json-server avec une query
     * @param query La query à effectuer, sous forme de chaîne de caractères. Créé à partir de QueryBuilder.js
     * @returns le résultat de la requête fetch au format JSON.
     */
    static fetchQuery = async (query) => {
        return await OperatorProvider.fetchRequest(`?${query}`, GET);
    }

    /**
     * Récupère les opérateurs
     * @param {Number} limit La limite d'éléments à récupérer
     * @returns Les opérateurs récupérés, limités à 10 par défaut
     */
    static fetchOperators = async (limit = 10) => {
        let query = new QueryBuilder()
            .setLimit(limit)
            .build();
        return await OperatorProvider.fetchQuery(query);
    }

    /**
     * Récupère tous les opérateurs
     * @returns Tous les opérateurs
     */
    static fetchAllOperators = async (filter) => {
        let query = new QueryBuilder()
            .setSort(filter)
            .build()
        return await OperatorProvider.fetchQuery(query);
    }

    /**
     * Méthode utile pour récupérer les opérateurs selon un filtre et une limite.
     * Des méthodes de tri spécifiques sont implémentées dans OperatorSortProvider.js.
     * @param {String} filter Le filtre à appliquer
     * @param {Number} limit La limite d'éléments à récupérer
     * @returns Les opérateurs récupérés, limités à 10 par défaut, triés selon le filtre
     */
    static fetchOperatorsBySort = async (filter, limit = 10) => {
        let query = new QueryBuilder()
            .setSort(filter)
            .setLimit(limit)
            .build();
        return await OperatorProvider.fetchQuery(query);
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
        let query = new QueryBuilder()
            .setFilter("camps", camp)
            .setLimit(limit)
        return await OperatorProvider.fetchQuery(query);
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
     * @param filters Les filtres à appliquer à la requête, si nécessaire
     * @returns Les opérateurs récupérés
     */
    static fetchPagesOperators = async (page, limit = 10, filters = {}) => {
        let queryBuilder = new QueryBuilder()
            .setPage(page, limit)
            .setSort("-annee,-saison");

        for (const [key, value] of Object.entries(filters)) {
            queryBuilder.setFilter(key, value);
        }
        let queryString = queryBuilder.build();
        return await OperatorProvider.fetchQuery(queryString);
    }

    /**
     * Récupère les opérateurs en fonction des filtres.
     * @param {*} filters Les filtres à appliquer à la requête, sous forme d'objet
     * @returns  Les opérateurs récupérés
     */
    static fetchOperatorsSearch = async (filters = {}) => {
        let queryBuilder = new QueryBuilder()
    
            .setSort("-annee,-saison");

        for (const [key, value] of Object.entries(filters)) {
            queryBuilder.setFilter(key, value);
        }
        let queryString = queryBuilder.build();
        return await OperatorProvider.fetchQuery(queryString);
    }

    /**
     * Récupère les spécialités d'un opérateur en fonction de son identifiant.
     *
     * Cette méthode permet de récupérer les spécialités d'un opérateur donné. Elle prend en entrée l'identifiant d'un opérateur
     * et retourne un tableau contenant les spécialités associées.
     * En cas d'erreur, un tableau vide est renvoyé.
     *
     * @param {string|number} operatorId L'identifiant de l'opérateur dont on souhaite récupérer les spécialités.
     * @returns {Promise<Array>} Une promesse qui renvoie un tableau des spécialités de l'opérateur.
     */
    static async getOperatorSpecialties(operatorId) {
        try {
            const specialties = await SpecialtyProvider.getSpecialtiesForOperator(operatorId);
            return specialties;
        } catch (error) {
            console.error('Error:', error);
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
            return result;
        } catch (error) {
            console.error("Erreur dans updateOperator:", error);
            throw error;
        }
    }

}