export default class Card {

    static render(operator, withLike = false, isLiked = false) {
        return /*html*/`
            <div class="col operator-all-section">
                <div class="card shadow-sm">
                    <!-- Logo -->
                    <div class="operator-logo">
                        <img loading="lazy" class="logo_perso" data-src="/static/img/logos/logo_${operator.nom.toLowerCase().replace(/\s+/g, '_')}.png" src="/static/img/placeholder.jpg" alt="Logo de ${operator.nom}">
                    </div>
                    <img loading="lazy" onclick="window.location.href='#/operators/${operator.id}'" data-src="/static/img/operators/${operator.image}" src="/static/img/placeholder.jpg" alt="${operator.nom}">
                    <div class="card-body">
                        <p class="card-text">${operator.nom ? operator.nom.slice(0, 100) : ''}</p>
                        <div class="btn-group">
                            <a href="#/operators/${operator.id}" class="btn btn-outline-secondary">+ Détails sur ${operator.nom}</a>
                            ${withLike ? Card.renderLikeButton(operator.id, isLiked) : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static renderLikeButton(idOperator, isLiked) {
        const likeButtonClass = isLiked ? "❤️" : "🤍";
        return /*html*/`
            <button class="btn btn-outline-primary like-button" data-operator-id="${idOperator}">
                ${likeButtonClass}
            </button>
        `;
    }

}