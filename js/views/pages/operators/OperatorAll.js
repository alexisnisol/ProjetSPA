import OperatorProvider from "../../../services/OperatorProvider.js";
import Views from "../../Views.js";
import Card from "../../../components/Card.js";
import { setupButtonHandlers, updateOperators } from "../../../services/OperatorHandlers.js";

export default class OperatorAll extends Views {

    async get_head() {
        return /*html*/`
        <link href="/static/css/operators.css" rel="stylesheet">
        `;
    }

    async render() {
        let operators = await OperatorProvider.fetchOperators(75);
        let html = operators.map(operator => Card.render(operator, true)).join('\n ');
        let content = /*html*/`
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
        `;
        setupButtonHandlers();

        return content;
    }
}