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
                    <a class="page-link" href="#" data-page="${currentPage - 1}">Précédent</a>
                </li>
            `;
        }

        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += /*html*/`
                <li class="page-item ${i === currentPage ? 'active' : ''}">
                    <a class="page-link" href="#" data-page="${i}">${i}</a>
                </li>
            `;
        }

        if (currentPage < totalPages) {
            paginationHTML += /*html*/`
                <li class="page-item">
                    <a class="page-link" href="#" data-page="${currentPage + 1}">Suivant</a>
                </li>
            `;
        }
        return paginationHTML;
    }

    setupButtons() {
        const paginationLinks = document.querySelectorAll('.page-link');
        paginationLinks.forEach(link => {
            link.addEventListener('click', async (event) => {
                event.preventDefault();
                const page = parseInt(link.dataset.page);
                await this.paginationHandler.changePage(page);
            });
        });
    }
}