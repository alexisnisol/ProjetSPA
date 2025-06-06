import Utils from '../../../services/Utils.js';
import OperatorProvider from "../../../services/providers/OperatorProvider.js";
import Views from "../../Views.js";
import Slider from "../../../components/Slider.js";
import EquipmentProvider from "../../../services/providers/EquipmentProvider.js";
import EquipmentGrid from "../../../components/EquipmentGrid.js"
import StarRating from "../../../components/StarRating.js";

export default class OperatorDetail extends Views {
    async get_head() {
        return /*html*/`
            <link href="/static/css/details.css" rel="stylesheet">
            <link href="/static/css/slider.css" rel="stylesheet">
            <link href="/static/css/equipment.css" rel="stylesheet">
            <link href="/static/css/star.css" rel="stylesheet">
            <link href="/static/css/popup.css" rel="stylesheet">
            <script src="../../../services/CursorSlider.js" defer></script>
        `;
    }

    async render() {
        let request = Utils.parseRequestURL();
        let operator = await OperatorProvider.getOperator(request.id);
        let operatorSpecialties = await OperatorProvider.getOperatorSpecialties(request.id);
        let sliderHTML = Slider.render(operator);
        let equipmentData = await EquipmentProvider.getOperatorEquipment(operator);
        let equipmentHTML = EquipmentGrid.render(equipmentData);
        let operatorTypeClass = operator.camps;

        return /*html*/`
            <section class="operator-detail ${operatorTypeClass}">
                <div class="main-background">
                    <div class="background-overlay"></div>
                    <button class="back-button" onclick="window.location.href='#/operators'">&#8592; Retour</button>

                    <img loading="lazy" src="/static/img/operators/${operator.image}" alt="${operator.nom}" class="operator-character">
                    
                    <div class="detail-content">
                        <div class="operator-header">
                        <div class="operator-title-logo">
                            <img loading="lazy" class="logo_perso" src="/static/img/logos/logo_${operator.nom.toLowerCase().replace(/\s+/g, '_')}.png" alt="Logo de ${operator.nom}">
                            <h1 class="resultation-title">${operator.nom.toUpperCase()}</h1>
                        </div>
                    </div>
                    ${StarRating.render(operator)}
                        
                        <div class="bio-section">
                            <h2 class="bio-title">BIOGRAPHIE</h2>
                            <div class="separator"></div>
                            <p class="bio-text">${operator.bio}</p>
                        </div>
                        
                        <div class="stats-section">
                            <div class="camp-info">
                                <p class="camp-title">CAMP</p>
                                <p class="camp-value">${operator.camps}</p>
                            </div>
                            
                            <div class="specialite-section">
                                <h3 class="specialite-title">SPÉCIALITÉ(S)</h3>
                                <p class="specialite-value">${operatorSpecialties.join(", ") || "Aucune"}</p>
                            </div>
                            
                            <div class="attributes-section">
                                <h3 class="attributes-title">ATTRIBUTS</h3>
                                ${sliderHTML}  
                            </div>
                        </div>
                        <div class="equipment-section">
                            <h3 id="equipement" class="equipment-title">ÉQUIPEMENT</h3>
                            ${equipmentHTML}
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    async after_render() {
        Slider.initSliders();
        StarRating.initStarRatings();
        let request = Utils.parseRequestURL();
        let operator = await OperatorProvider.getOperator(request.id);
        EquipmentGrid.init(operator);
    }
}
