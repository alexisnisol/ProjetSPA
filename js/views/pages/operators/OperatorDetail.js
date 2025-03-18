import Utils        from '../../../services/Utils.js'
import OperatorProvider from "./../../../services/OperatorProvider.js";
import Views from "../../Views.js";

export default class OperatorDetail extends Views {
    async render () {
        let request = Utils.parseRequestURL()
        let post = await OperatorProvider.getOperator(request.id)
        
        return /*html*/`
            <section class="section">
                <h1> Article index : ${post.index}</h1>
                <p> Post Title : ${post.title} </p>
                <p> Post Content : ${post.text} </p>
            </section>
            <p><a href="/">back to home</a></p>
            <p><a href="#/articles">back to all articles</a></p>
        `
    }
}

