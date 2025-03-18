import OperatorProvider from "../../../services/OperatorProvider.js";
import Views from "../../Views.js";

export default class OperatorAll extends Views {

    async get_head() {
        return `
        <link href="/static/css/operators.css" rel="stylesheet">
        `
    }

    async render () {
        let articles = await OperatorProvider.fetchOperator(50);
        let view =  /*html*/`
            <h2>Les Agents</h2>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                ${ articles.map(operator => 
                    /*html*/`
                    <div class="col">
                    <div class="card shadow-sm">
                        <img src="/static/img/operators/${operator.image}" class="bd-placeholder-img card-img-top" width="100%" height="500" alt="${operator.nom}">
                        <div class="card-body">
                            <p class="card-text">${operator.nom ? operator.nom.slice(0,100) : ''}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                <a href="#/articles/${operator.id}" class="btn btn-sm btn-outline-secondary">Voir ${operator.nom}</a>
                                </div>
                                <small class="text-body-secondary">${operator.id}</small>
                            </div>
                        </div>
                    </div>
                    </div>
                    `
                    ).join('\n ')
                }
            </div>
        `
        return view
    }

}