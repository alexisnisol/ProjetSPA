export class PaginationHandler {
    constructor(totalItems, itemsPerPage, currentPage = 1) {
        this.totalItems = totalItems;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = currentPage;
    }

    renderPagination() {
        const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        let paginationHTML = '';

        if (this.currentPage > 1) {
            paginationHTML += /*html*/`
                <li class="page-item">
                    <a class="page-link" href="#" data-page="${this.currentPage - 1}">Précédent</a>
                </li>
            `;
        }

        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += /*html*/`
                <li class="page-item ${i === this.currentPage ? 'active' : ''}">
                    <a class="page-link" href="#" data-page="${i}">${i}</a>
                </li>
            `;
        }

        if (this.currentPage < totalPages) {
            paginationHTML += /*html*/`
                <li class="page-item">
                    <a class="page-link" href="#" data-page="${this.currentPage + 1}">Suivant</a>
                </li>
            `;
        }

        return paginationHTML;
    }

    setupPagination(callback) {
        const paginationLinks = document.querySelectorAll('.page-link');
        paginationLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const page = parseInt(link.dataset.page);
                this.currentPage = page;
                callback(page);
            });
        });
    }
}