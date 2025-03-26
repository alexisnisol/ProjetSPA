import OperatorProvider from "./OperatorProvider.js";

export class PaginationHandler {
    constructor(itemsPerPage = 10, startPage = 1) {
        this.itemsPerPage = itemsPerPage;
        this.currentPage = startPage;
        this.paginate = {};
        this.operators = [];
        this.totalPages = 10;
    }

    async requestPage(page=this.currentPage) {
        this.currentPage = page;
        this.paginate = await OperatorProvider.fetchPagesOperators(this.currentPage, this.itemsPerPage);
        this.operators = this.paginate['data'];
        this.totalPages = this.paginate['pages'];
        return this.operators;
    }

    changePage(page) {
        this.currentPage = page;
    }

}