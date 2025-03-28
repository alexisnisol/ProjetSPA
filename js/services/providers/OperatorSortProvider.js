import OperatorProvider from './OperatorProvider.js';

export default class OperatorSortProvider {

    static fetchByDate = async (limit = 10, desc = true) => {
        let filter = desc ? "-annee,-saison" : "annee,saison";
        return await OperatorProvider.fetchOperatorsBySort(filter, limit);
    }

    static fetchAllByDate = async (desc = true) => {
        let filter = desc ? "-annee,-saison" : "annee,saison";
        return await OperatorProvider.fetchAllOperators(filter);
    }
    
}
