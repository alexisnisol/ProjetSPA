import OperatorSortProvider from "../providers/OperatorSortProvider.js";
import Views from "../../views/Views.js";

export default class OperatorsHandler {

    static async updateOperators(views) {
        if (!(views instanceof Views)) {
            throw new Error("views doit être une instance de Views");
        }
        let container = document.querySelector(".row");
        if (container) {
            // On remplace le contenu de la page par le contenu de la vue
            const content = document.querySelector('#content');
            content.innerHTML = await views.render();
            await views.after_render();
        } else {
            console.error("Le conteneur des opérateurs n'a pas été trouvé !");
        }
    }

    setupButtonHandlers(operatorAllInstance) {
        let orangeBtn = document.getElementById("orange-btn");
        let blueBtn = document.getElementById("blue-btn");

        if (orangeBtn && blueBtn) {
            orangeBtn.addEventListener("click", async (event) => {
                event.preventDefault();
                operatorAllInstance.currentFilter = "Assaillant";
                operatorAllInstance.currentPage = 1;
                let assailants = await OperatorSortProvider.fetchByCamp("Assaillant");
                updateOperators(assailants);
                operatorAllInstance.render();
            });

            blueBtn.addEventListener("click", async (event) => {
                event.preventDefault();
                operatorAllInstance.currentFilter = "Défense";
                operatorAllInstance.currentPage = 1;
                let defenseurs = await OperatorSortProvider.fetchByCamp("Défense");
                updateOperators(defenseurs);
                operatorAllInstance.render();
            });
        } else {
            console.error("Les boutons ne sont pas trouvés !");
        }
    }
}
