import Views from "../../Views.js";
import Card from "../../../components/Card.js";
import {setupButtonHandlers} from "../../../services/OperatorHandlers.js";
import {getFavorites, isFavorite, setupLikeButtons} from "../../../services/LikeHandler.js";
import {PaginationHandler} from "../../../services/PaginationHandler.js";
import PaginationView from "../../../components/PaginationView.js";

export default class Favorites extends Views {
    
    constructor() {
        super();
        this.paginationHandler = new PaginationHandler();
        this.paginationView = new PaginationView(this, this.paginationHandler);
    }

    async get_head() {
        return /*html*/`
        <link href="/static/css/operators.css" rel="stylesheet">
        <link href="/static/css/pagination.css" rel="stylesheet">
        `;
    }

    async render() {
        /*getFavorites().forEach((fav) => {
            this.paginationHandler.
        })*/
        this.operators = (await this.paginationHandler.requestPage()).filter(operator => isFavorite(operator.id));
        const html = this.operators.map(operator => Card.render(operator, true, isFavorite(operator.id))).join('\n ');

        const paginationHTML = PaginationView.render(this.paginationHandler.currentPage, this.paginationHandler.totalPages);
        const content = /*html*/`
            <!-- Section Hero avec boutons et barre de recherche -->
            <div class="hero-section">
                <div class="hero-content">
                    <h1>Mes Agents Favoris</h1>
                    <div class="button-container">
                        <button class="btn btn-orange" id="orange-btn">
                            <img src="../../static/img/ui/logoAssaillant.png" alt="Icon 1" id="icon1" class="btn-icon">
                            ASSAILLANTS
                        </button>
                        <button class="btn btn-blue" id="blue-btn">
                            <img src="../../static/img/ui/logoDefenseur.png" alt="Icon 2" id="icon2" class="btn-icon">
                            DÉFENSEURS
                        </button>
                    </div>

                </div>
            </div>

            <!-- Liste des opérateurs -->
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-3 justify-content-center">
                ${html}
            </div>

            <!-- Pagination -->
            <nav aria-label="Page navigation">
                <ul class="pagination justify-content-center mt-4">
                    ${paginationHTML}
                </ul>
            </nav>
        `;

        return content;
    }

    async after_render() {
        this.paginationView.setupButtons();
        setupButtonHandlers(this);
        setupLikeButtons();
    }
}