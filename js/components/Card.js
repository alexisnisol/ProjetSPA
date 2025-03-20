export default class Card {

    static render(operator) {
        return /*html*/`
            <div class="col">
                <div class="card shadow-sm">
                    <img src="/static/img/operators/${operator.image}" alt="${operator.nom}">
                    <div class="card-body">
                        <p class="card-text">${operator.nom ? operator.nom.slice(0, 100) : ''}</p>
                        <div class="btn-group">
                            <a href="#/operators/${operator.id}" class="btn btn-outline-secondary">+ Détails sur ${operator.nom}</a>
                        </div>
                    </div>
                </div>
            </div>
            `;
    }
}