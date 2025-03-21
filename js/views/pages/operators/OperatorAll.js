import OperatorProvider from "../../../services/OperatorProvider.js";
import Views from "../../Views.js";
import Card from "../../../components/Card.js";
import { setupButtonHandlers, updateOperators } from "../../../services/OperatorHandlers.js";
import { setupLikeButtons } from "../../../services/LikeHandler.js";
import { PaginationHandler } from "../../../services/PaginationHandler.js";

export default class OperatorAll extends Views {
    constructor() {
        super();
        this.currentPage = 1;
        this.operatorsPerPage = 10;
        this.totalOperators = 75;
        this.operators = [];
        this.currentFilter = null;
        this.paginationHandler = new PaginationHandler(this.totalOperators, this.operatorsPerPage, this.currentPage);
    }

    async get_head() {
        return /*html*/`
        <link href="/static/css/operators.css" rel="stylesheet">
        <link href="/static/css/pagination.css" rel="stylesheet">
        `;
    }

    async render() {
        this.operators = await OperatorProvider.fetchOperators(this.totalOperators);
        return this.renderPage();
    }

    async renderPage() {
        let filteredOperators = this.operators;
        if (this.currentFilter) {
            filteredOperators = await OperatorProvider.fetchOperatorsByCamp(this.currentFilter, this.totalOperators);
        }

        const startIndex = (this.currentPage - 1) * this.operatorsPerPage;
        const endIndex = startIndex + this.operatorsPerPage;
        const operatorsToShow = filteredOperators.slice(startIndex, endIndex);

        const html = operatorsToShow.map(operator => Card.render(operator, true)).join('\n ');

        const paginationHTML = this.paginationHandler.renderPagination();

        const content = /*html*/`
            <!-- Section Hero avec boutons et barre de recherche -->
            <div class="hero-section">
                <div class="hero-content">
                    <h1>TOUS LES AGENTS</h1>
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

                    <!-- Titre au-dessus de la barre de recherche -->
                    <h2 class="search-title">Recherchez :</h2>

                    <!-- Barre de recherche et boutons -->
                    <div class="search-container">
                        <button class="btn-filter">
                            <img src="../../static/img/ui/fleche_blanche.png" alt="Filtres" class="btn-icon">
                            Voir les filtres
                        </button>
                        <div class="search-bar">
                            <input type="text" placeholder="Rechercher un agent...">
                            <button class="search-btn">
                                <img src="../../static/img/ui/loupe.png" alt="Rechercher">
                            </button>
                        </div>
                        <button class="btn-sort">
                            <img src="../../static/img/ui/fleche_blanche.png" alt="Trier" class="btn-icon">
                            Trier
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

        const mainContainer = document.querySelector('main');
        if (mainContainer) {
            mainContainer.innerHTML = content;
        }

        setupButtonHandlers(this);
        setupLikeButtons();
        this.paginationHandler.setupPagination((page) => {
            this.currentPage = page;
            this.renderPage();
        });

        return content;
    }
}