import OperatorProvider from "./OperatorProvider.js";

export class PaginationHandler {
    constructor(itemsPerPage = 10, currentPage = 1) {
        this.itemsPerPage = itemsPerPage;
        this.currentPage = currentPage;

        this.requestPage(this.currentPage);
    }

    async requestPage(page) {
        this.currentPage = page;
        this.paginate = await OperatorProvider.fetchPagesOperators(this.currentPage, this.itemsPerPage);
        console.log(this.paginate);
        this.operators = this.paginate['data'];
        this.totalPages = this.paginate['pages'];
        this.totalOperators = this.paginate['items'];
    }

    handleNextPage() { 
        this.requestPage(this.paginate['next']);
    }

    handlePreviousPage() {
        this.requestPage(this.paginate['prev'] || 1);
    }
}