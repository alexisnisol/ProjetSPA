import OperatorProvider from "../../services/OperatorProvider.js";
import Card from "../../components/Card.js";
import Views from "../Views.js";

export default class Home extends Views {

    async render() {
        let operators = await OperatorProvider.fetchOperator(3);
        let html = operators.map(operator => Card.render(operator)
        ).join('\n ');

        return /*html*/`
            <link rel="stylesheet" href="../../../static/css/home.css">
            <div class="hero-section">
                <div>
                    <h1>TOM CLANCY'S RAINBOW SIX SIEGE</h1>
                    <p>Personalisez votre arsenal selon votre style.</p>
                    <a href="#en-savoir-plus" class="btn btn-primary">En savoir plus</a>
                </div>
            </div>
            <div class="recent-characters-section">
                <h2 class="title_3_persos">LES NOUVEAUX PERSONNAGES</h2>
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 justify-content-center">
                    ${html}
                </div>
            </div>
            </div>
            <div class="video-section">
                <video autoplay muted loop class="background-video">
                    <source src="/static/video/video_presentation_deimos.mp4" type="video/mp4">
                </video>
                <div class="content-box">
                    <h2>OPÉRATION DEALY OMEN</h2>
                    <p>L'infâme Deimos, un des piliers fondateurs de Rainbow Six et aujourd'hui un de ses plus fervents détracteurs, a été ajouté à la liste des agents cette saison. Originaire des États-Unis, il est équipé de son redoutable traqueur, le DeathMARK.</p>
                    <a href="#rejoindre" class="btn btn-primary">Détails Deimos</a>
                </div>
            </div>
        `;
    }
}