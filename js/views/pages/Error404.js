import Views from "../Views.js";

export default class Error404 extends Views {
    async render () {
        let view =  `
            <h2>Error 404</h2>
        `;
        return view
    }
}