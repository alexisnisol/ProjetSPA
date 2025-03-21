import OperatorSortProvider from "./OperatorSortProvider.js";
import Card from "../components/Card.js";

export function setupButtonHandlers(operatorAllInstance) {
    setTimeout(() => {
        let orangeBtn = document.getElementById("orange-btn");
        let blueBtn = document.getElementById("blue-btn");

        if (orangeBtn && blueBtn) {
            orangeBtn.addEventListener("click", async (event) => {
                event.preventDefault();
                operatorAllInstance.currentFilter = "Assaillant";
                operatorAllInstance.currentPage = 1;
                let assailants = await OperatorSortProvider.fetchByCamp("Assaillant");
                updateOperators(assailants);
                operatorAllInstance.renderPage();
            });

            blueBtn.addEventListener("click", async (event) => {
                event.preventDefault();
                operatorAllInstance.currentFilter = "Défense";
                operatorAllInstance.currentPage = 1;
                let defenseurs = await OperatorSortProvider.fetchByCamp("Défense");
                updateOperators(defenseurs);
                operatorAllInstance.renderPage();
            });
        } else {
            console.error("Les boutons ne sont pas trouvés !");
        }
    }, 100);
}

export function updateOperators(operators) {
    console.log("Mise à jour des opérateurs", operators);
    let container = document.querySelector(".row");
    if (container) {
        let html = operators.map(operator => Card.render(operator, true)).join("\n ");
        container.innerHTML = html;
    } else {
        console.error("Le conteneur des opérateurs n'a pas été trouvé !");
    }
}