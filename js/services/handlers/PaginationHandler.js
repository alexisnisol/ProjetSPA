import OperatorProvider from "../providers/OperatorProvider.js";

export class PaginationHandler {
    constructor(itemsPerPage = 10, startPage = 1) {
        this.itemsPerPage = itemsPerPage;
        this.currentPage = startPage;
        this.paginate = {};
        this.operators = [];
        this.totalPages = 10;
        this.filters = {};
    }

    async requestPage(page=this.currentPage) {
        this.currentPage = page;
        this.paginate = await OperatorProvider.fetchPagesOperators(this.currentPage, this.itemsPerPage, this.filters);
        this.operators = this.paginate['data'];
        this.totalPages = this.paginate['pages'];
        return this.operators;
    }

    changePage(page) {
        this.currentPage = page;
    }

    setFilter(key, value) {
        this.filters[key] = value;
    }

    hasFilter(key, value) {
        return this.filters[key] === value;
    }

    clearFilters() {
        this.filters = {};
    }
}