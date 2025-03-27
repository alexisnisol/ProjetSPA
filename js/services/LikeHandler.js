export function setupLikeButtons() {
        const likeButtons = document.querySelectorAll('.like-button');
        likeButtons.forEach(button => {
            button.addEventListener('click', (event) => toggleLike(event, button.getAttribute("data-operator-id")));
        });
}

function toggleLike(event, idOperator) {
    const likeButton = event.target;
    const isLiked = isFavorite(idOperator);
    likeButton.textContent = isLiked ? "🤍" : "❤️";

    toggleFavorite(idOperator);
}

/**
 * Récupère la liste des favoris depuis le localStorage.
 * @returns {string[]} Liste des favoris, contenant l'id des personnages.
 */
function getFavorites() {
    const favorites = localStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : [];
}

/**
 * Vérifie si un ID est dans les favoris.
 * @param {string} id - L'ID à vérifier
 * @returns {boolean} Vrai si l'id est inclu dans les favoris du local storage, Faux sinon.
 */
export function isFavorite(id) {
    return getFavorites().includes(id);
}

/**
 * Ajoute un ID aux favoris s'il n'y est pas déjà.
 * @param {string} id - L'ID à ajouter
 */
function addFavorite(id) {
    const favorites = getFavorites();
    if (!favorites.includes(id)) {
        favorites.push(id);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
}

/**
 * Supprime un ID des favoris.
 * @param {string} id - L'ID à supprimer
 */
function removeFavorite(id) {
    const favorites = getFavorites().filter(fav => fav !== id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

/**
 * Ajoute ou supprime un favori en fonction de sa présence dans le LocalStorage.
 * @param {string} id - L'ID à modifier dans les favoris.
 */
function toggleFavorite(id) {
    isFavorite(id) ? removeFavorite(id) : addFavorite(id);
}