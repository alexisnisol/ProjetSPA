import OperatorsHandler from "./OperatorsHandler.js";

export default class SearchHandler {

    constructor() {
        this.search = "";
    }

    hasSearch() {
        return this.search != null && this.search !== "";
    }

    getSearch() {
        return this.search == null ? "" : this.search;
    }

    setSearch(value) {
        this.search = value;
    }

    setup(views) {
        document.querySelector("#search-input").addEventListener("change", async (event) => {
            this.setSearch(event.target.value);
            await OperatorsHandler.updateOperators(views);
        });
    }
}