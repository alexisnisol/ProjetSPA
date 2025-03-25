import OperatorProvider from "./OperatorProvider.js";

export class PaginationHandler {
    constructor(itemsPerPage = 10, startPage = 1) {
        this.itemsPerPage = itemsPerPage;
        this.currentPage = startPage;
        this.paginate = {};
        this.operators = [];
        this.totalPages = 10;
        this.totalOperators = 0;
    }

    async requestPage(page=this.currentPage) {
        this.currentPage = page;
        this.paginate = await OperatorProvider.fetchPagesOperators(this.currentPage, this.itemsPerPage);
        this.operators = this.paginate;
        this.totalOperators = this.paginate;
        return this.paginate;
    }

    async handleNextPage() {
        await this.requestPage(this.paginate['next']);
    }

    async handlePreviousPage() {
        await this.requestPage(this.paginate['prev'] || 1);
    }
}