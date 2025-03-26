import OperatorProvider from './OperatorProvider.js';

export default class OperatorSortProvider {

    static fetchByDate = async (limit = 10, desc = true) => {
        let filter = desc ? "-annee,-saison" : "annee,saison";
        return await OperatorProvider.fetchOperatorsBySort(filter, limit);
    }

    static fetchByCamp = async (camp) => {
        const operators = await OperatorProvider.fetchOperatorsByCamp(camp, 75);
        return operators;
    };
    
}
