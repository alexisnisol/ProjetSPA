export default class Card {
    static render(operator, withLike = false, isLiked = false) {
        return /*html*/`
            <div class="col operator-all-section">
                <div class="card shadow-sm">
                    <!-- Logo -->
                    <div class="operator-logo">
                        <img class="logo_perso" src="/static/img/logos/logo_${operator.nom.toLowerCase().replace(/\s+/g, '_')}.png" alt="Logo de ${operator.nom}">
                    </div>
                    <img src="/static/img/operators/${operator.image}" alt="${operator.nom}">
                    <div class="card-body">
                        <p class="card-text">${operator.nom ? operator.nom.slice(0, 100) : ''}</p>
                        <div class="btn-group">
                            <a href="#/operators/${operator.id}" class="btn btn-outline-secondary">+ Détails sur ${operator.nom}</a>
                            ${withLike ? Card.renderLikeButton(isLiked) : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static renderLikeButton(isLiked) {
        const likeButtonClass = isLiked ? "❤️" : "🤍";
        return /*html*/`
            <button class="btn btn-outline-primary like-button" onclick="toggleLike()">
                ${likeButtonClass}
            </button>
        `;
    }
}
