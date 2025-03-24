import Utils from '../../../services/Utils.js';
import OperatorProvider from "../../../services/OperatorProvider.js";
import Views from "../../Views.js";

export default class OperatorDetail extends Views {
    async get_head() {
        return /*html*/`
            <link href="/static/css/details.css" rel="stylesheet">
        `;
    }

    async render() {
        let request = Utils.parseRequestURL();
        let operator = await OperatorProvider.getOperator(request.id);
        
        return /*html*/`
            <section class="operator-detail">
                <!-- Conteneur principal avec le fond de base -->
                <div class="main-background">
                    <!-- Overlay qui se superpose -->
                    <div class="background-overlay"></div>
                    
                    <!-- Opérateur en avant-plan -->
                    <img src="/static/img/operators/${operator.image}" alt="${operator.nom}" class="operator-character">
                    
                    <!-- Contenu texte -->
                    <div class="detail-content">
                        <h1 class="resultation-title">DÉTAILS ${operator.nom.toUpperCase()}</h1>
                        
                        <div class="bio-section">
                            <h2 class="bio-title">BIOGRAPHIE</h2>
                            <div class="separator"></div>
                            <p class="bio-text">${operator.bio}</p>
                        </div>
                        
                        <div class="stats-section">
                            <div class="camp-info">
                                <p class="camp-title">CAMP</p>
                                <p class="camp-value">${operator.camps}</p>
                                <p class="escouade">DÉFENSEUR ESCOUADE</p>
                                <p class="wolfguard">WOLFGUARD</p>
                            </div>
                            
                            <div class="specialite-section">
                                <h3 class="specialite-title">SPÉCIALITÉ</h3>
                                <p class="specialite-value">ANTI-NITRUSION, ANTI-GADGET</p>
                            </div>
                            
                            <div class="attributes-section">
                                <h3 class="attributes-title">ATTRIBUTS</h3>
                                <div class="attribute">
                                    <span>SANTÉ</span>
                                    <div class="stat-bar"><div class="stat-fill" style="width: ${operator.sante * 33}%"></div></div>
                                </div>
                                <div class="attribute">
                                    <span>VITESSE</span>
                                    <div class="stat-bar"><div class="stat-fill" style="width: ${operator.vitesse * 33}%"></div></div>
                                </div>
                                <div class="attribute">
                                    <span>DIFFICULTÉ</span>
                                    <div class="stat-bar"><div class="stat-fill" style="width: ${operator.difficulte * 33}%"></div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}