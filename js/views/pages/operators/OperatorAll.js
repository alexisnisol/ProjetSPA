import Views from "../../Views.js";
import Card from "../../../components/Card.js";
import { isFavorite, setupLikeButtons } from "../../../services/handlers/LikeHandler.js";
import { PaginationHandler } from "../../../services/handlers/PaginationHandler.js";
import PaginationView from "../../../components/PaginationView.js";
import OperatorsHandler from "../../../services/handlers/OperatorsHandler.js";
import SearchHandler from "../../../services/handlers/SearchHandler.js";
import OperatorProvider from "../../../services/providers/OperatorProvider.js";
import { reloadLazyImages } from "../../../app.js";

export default class OperatorAll extends Views {
    
    constructor() {
        super();
        this.paginationHandler = new PaginationHandler();
        this.searchHandler = new SearchHandler();
        this.paginationView = new PaginationView(this, this.paginationHandler);
    }

    async applyFilter(filterKey, filterValue) {
        this.paginationHandler.setFilter(filterKey, filterValue);
        this.paginationHandler.changePage(1);
        await OperatorsHandler.updateOperators(this);
    }

    async get_head() {
        return /*html*/`
        <link href="/static/css/operators.css" rel="stylesheet">
        <link href="/static/css/pagination.css" rel="stylesheet">
        `;
    }

    async render() {
        this.operators = await this.paginationHandler.requestPage();
        if(this.searchHandler.hasSearch()) {
            this.operators = (await OperatorProvider.fetchOperatorsSearch(this.paginationHandler.filters)).filter(operator => operator.image.toLowerCase().includes(this.searchHandler.getSearch().toLowerCase()));
        }
        let html = this.operators.map(operator => Card.render(operator, true, isFavorite(operator.id))).join('\n ');
        if (this.operators.length === 0) {
            html = "<p class='btn no-character'>Aucun personnage</p>";
        }
        const paginationHTML = PaginationView.render(this.paginationHandler.currentPage, this.paginationHandler.totalPages);
        const content = /*html*/`
            <!-- Section Hero avec boutons et barre de recherche -->
            <div class="hero-section">
                <div class="hero-content">
                    <h1>TOUS LES AGENTS</h1>
                    <div class="button-container">
                        <button class="btn btn-orange ${this.paginationHandler.hasFilter("camps", "Assaillant") ? "selected" : ""}" id="orange-btn">
                            <img loading="lazy" src="../../static/img/ui/logoAssaillant.png" alt="Icon 1" id="icon1" class="btn-icon">
                            ASSAILLANTS
                        </button>
                        <button class="btn btn-blue ${this.paginationHandler.hasFilter("camps", "Défense") ? "selected" : ""}" id="blue-btn">
                            <img loading="lazy" src="../../static/img/ui/logoDefenseur.png" alt="Icon 2" id="icon2" class="btn-icon">
                            DÉFENSEURS
                        </button>
                    </div>

                    <!-- Titre au-dessus de la barre de recherche -->
                    <h2 class="search-title">Recherchez :</h2>

                    <!-- Barre de recherche et boutons -->
                    <div class="search-container">
                        <div class="filter-container">
                            <button class="btn-filter">
                                <img loading="lazy" src="../../static/img/ui/fleche_blanche.png" alt="Filtres" class="btn-icon fleche-filter">
                                Voir les filtres
                            </button>

                            <div class="dropdown" id="dropdownMenu">
                                <ul>
                                    <li>Première ligne</li>
                                    <li>Contrôle des foules</li>
                                    <li>Piégeur</li>
                                    <li>Brèche</li>
                                    <li>Renseignement</li>
                                    <li>Anti-gadget</li>
                                    <li>Anti-intrusion</li>
                                    <li>Contrôle de la carte</li>
                                </ul>
                            </div>
                        </div>
                        <div class="search-bar">
                            <input type="text" id="search-input" placeholder="Rechercher un agent..." value="${this.searchHandler.getSearch()}">
                            <button class="search-btn">
                                <img loading="lazy" src="../../static/img/ui/loupe.png" alt="Rechercher">
                            </button>
                        </div>
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
                    ${this.searchHandler.hasSearch() ? "" : paginationHTML}
                </ul>
            </nav>
        `;

        return content;
    }

    async after_render() {
        this.paginationView.setupButtons();
        OperatorsHandler.setupButtonHandlers(this);
        setupLikeButtons();
        this.searchHandler.setup(this);
        reloadLazyImages();
    }
}