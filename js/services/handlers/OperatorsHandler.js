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

    static setupButtonHandlers(views) {
        let orangeBtn = document.getElementById("orange-btn");
        let blueBtn = document.getElementById("blue-btn");

        if (orangeBtn && blueBtn) {
            orangeBtn.addEventListener("click", async (event) => {
                event.preventDefault();
                orangeBtn.classList.remove("selected");
                blueBtn.classList.remove("selected");
                if (views.paginationHandler.hasFilter("camps", "Assaillant")) {
                    await views.applyFilter("camps", "");
                    return;
                }
                await views.applyFilter("camps", "Assaillant");
            });

            blueBtn.addEventListener("click", async (event) => {
                event.preventDefault();
                orangeBtn.classList.remove("selected");
                blueBtn.classList.remove("selected");
                if (views.paginationHandler.hasFilter("camps", "Défense")) {
                    await views.applyFilter("camps", "");
                    return;
                }
                await views.applyFilter("camps", "Défense");
            });
        } else {
            console.error("Les boutons ne sont pas trouvés !");
        }

        const filterButton = document.querySelector(".btn-filter");
        const dropdown = document.getElementById("dropdownMenu");
        const buttonIcon = document.querySelector(".fleche-filter");
        const filters = document.querySelectorAll("#dropdownMenu li"); // Sélectionne tous les filtres

        filterButton.addEventListener("click", function () {
            buttonIcon.style.transform = (dropdown.style.display === "block") ? "rotate(0deg)" : "rotate(180deg)";
            dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
        });

        filters.forEach(filter => {
            filter.addEventListener("click", async function () {
                //TODO : Ajouter un filtre
            });
        });

        document.addEventListener("click", function (event) {
            if (dropdown.style.display === "block" && !filterButton.contains(event.target)) {
                buttonIcon.style.transform = "rotate(0deg)";
                dropdown.style.display = "none";
            }
        });
    }
}
