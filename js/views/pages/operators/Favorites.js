import Views from "../../Views.js";
import Card from "../../../components/Card.js";
import {isFavorite, setupLikeButtons} from "../../../services/handlers/LikeHandler.js";
import OperatorsHandler from "../../../services/handlers/OperatorsHandler.js";
import OperatorSortProvider from "../../../services/providers/OperatorSortProvider.js";

export default class Favorites extends Views {
    
    constructor() {
        super();
    }

    async get_head() {
        const operators = (await OperatorSortProvider.fetchAllByDate()).filter(operator => isFavorite(operator.id));
        const hasFavorites = operators.length > 0;
        
        return /*html*/`  
            ${hasFavorites 
                ? /* Si favoris existants */`
                  <link href="/static/css/operators.css" rel="stylesheet">
                  `
                : /* Si aucun favori */`
                  <link href="/static/css/favorite.css" rel="stylesheet">
                  `
            }
        `;
    }

    async render() {
        this.operators = (await OperatorSortProvider.fetchAllByDate()).filter(operator => isFavorite(operator.id));
        this.hasFavorites = this.operators.length > 0;
        const html = this.operators.map(operator => Card.render(operator, true, isFavorite(operator.id))).join('\n ');
    
        const content = /*html*/`
            <!-- Section Hero avec boutons et barre de recherche -->
            <div class="hero-section">
                <div class="hero-content">
                    <h1>${this.hasFavorites ? 'MES AGENTS FAVORIS' : 'AUCUN AGENT FAVORI'}</h1>
                    ${!this.hasFavorites ? /*html*/`
                        <div class="empty-message">
                            <p>Vous n'avez pas encore d'agents favoris</p>
                            <a href="#/operators" class="btn-discover">Découvrir les opérateurs</a>
                        </div>
                    ` : ''}
                </div>
            </div>
    
            <!-- Liste des opérateurs -->
            <div class="row">
                ${html}
            </div>
        `;
    
        return content;
    }

    async after_render() {
        setupLikeButtons();
    }
}