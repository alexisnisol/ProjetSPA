export default class PaginationView {

    constructor(view, paginationHandler) {
        this.view = view;
        this.paginationHandler = paginationHandler;
    }
    
    static render(currentPage, totalPages) {
        let paginationHTML = '';

        if (currentPage > 1) {
            paginationHTML += /*html*/`
                <li class="page-item">
                    <a class="page-link" data-page="${currentPage - 1}">Précédent</a>
                </li>
            `;
        }

        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += /*html*/`
                <li class="page-item ${i === currentPage ? 'active' : ''}">
                    <a class="page-link" data-page="${i}">${i}</a>
                </li>
            `;
        }

        if (currentPage < totalPages) {
            paginationHTML += /*html*/`
                <li class="page-item">
                    <a class="page-link" data-page="${currentPage + 1}">Suivant</a>
                </li>
            `;
        }
        return paginationHTML;
    }

    setupButtons() {
        const paginationLinks = document.querySelectorAll('.page-link');
        paginationLinks.forEach(link => {
            link.addEventListener('click', async (event) => {
                const page = parseInt(link.dataset.page);
                await this.paginationHandler.changePage(page);
                // On remplace le contenu de la page par le contenu de la vue
                const content = null || document.querySelector('#content');
                content.innerHTML = await this.view.render();
                await this.view.after_render();
            });
        });
    }
}