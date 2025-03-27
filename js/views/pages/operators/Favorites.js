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
        return /*html*/`
        <link href="/static/css/operators.css" rel="stylesheet">
        <link href="/static/css/pagination.css" rel="stylesheet">
        `;
    }

    async render() {
        this.operators = (await OperatorSortProvider.fetchAllByDate()).filter(operator => isFavorite(operator.id));
        const html = this.operators.map(operator => Card.render(operator, true, isFavorite(operator.id))).join('\n ');

        const content = /*html*/`
            <!-- Section Hero avec boutons et barre de recherche -->
            <div class="hero-section">
                <div class="hero-content">
                    <h1>Mes Agents Favoris</h1>
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
        OperatorsHandler.setupButtonHandlers(this);
        setupLikeButtons();
    }
}