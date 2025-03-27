export default class QueryBuilder {

    constructor() {
        this.queryParams = new URLSearchParams();
    }

    setFilter(key, value) {
        this.queryParams.set(key, value);
        return this;
    }

    setSort(sort) {
        this.queryParams.set('_sort', sort);
        return this;
    }

    setPage(page, per_page) {
        this.queryParams.set('_page', page);
        this.queryParams.set('_per_page', per_page);
        return this;
    }

    setLimit(limit) {
        this.queryParams.set('_limit', limit);
        return this;
    }

    build() {
        return this.queryParams.toString();
    }
}

// Factory function to create a new QueryBuilder instance
function createQueryBuilder() {
    return new QueryBuilder();
}
