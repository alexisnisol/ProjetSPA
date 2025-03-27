export default class Slider {
    static render(operator) {
        console.log(`[Slider.render] Rendu des sliders pour l'opérateur ${operator.nom} (ID: ${operator.id})`);
        console.log(`[Slider.render] Valeurs initiales - Santé: ${operator.sante}, Vitesse: ${operator.vitesse}, Difficulté: ${operator.difficulte}`);
        
        return /*html*/`
            <div class="operator-slider-section">
                <div class="attribute">
                    <span>SANTÉ</span>
                    <input type="range" class="stat-slider" min="1" max="3" step="1" 
                           value="${operator.sante}" data-attribute="sante" data-operator-id="${operator.id}">
                    <span class="value">${operator.sante}</span>
                </div>

                <div class="attribute">
                    <span>VITESSE</span>
                    <input type="range" class="stat-slider" min="1" max="3" step="1" 
                           value="${operator.vitesse}" data-attribute="vitesse" data-operator-id="${operator.id}">
                    <span class="value">${operator.vitesse}</span>
                </div>

                <div class="attribute">
                    <span>DIFFICULTÉ</span>
                    <input type="range" class="stat-slider" min="1" max="3" step="1" 
                           value="${operator.difficulte}" data-attribute="difficulte" data-operator-id="${operator.id}">
                    <span class="value">${operator.difficulte}</span>
                </div>
            </div>
        `;
    }

    static async updateSlider(attribute, value, operatorId) {
        console.log(`[updateSlider] Début de mise à jour - Attr: ${attribute}, Valeur: ${value}, OpID: ${operatorId}`);
        
        try {
            console.log(`[updateSlider] Récupération de l'opérateur ${operatorId}...`);
            const operator = await OperatorProvider.getOperator(operatorId);
            
            if (operator) {
                console.log(`[updateSlider] Opérateur trouvé:`, operator);
                const numericValue = parseInt(value, 10);
                
                if (numericValue < 1 || numericValue > 3) {
                    const errorMsg = `Valeur invalide ${numericValue}. Doit être entre 1 et 3`;
                    console.error(`[updateSlider] ${errorMsg}`);
                    throw new Error(errorMsg);
                }
    
                const updatedData = {
                    ...operator,
                    [attribute]: numericValue
                };
                
                console.log(`[updateSlider] Préparation des données pour PUT:`, updatedData);
                console.log(`[updateSlider] Envoi à OperatorProvider.updateOperator...`);
                
                const result = await OperatorProvider.updateOperator(operatorId, updatedData);
                
                console.log(`[updateSlider] Réponse du serveur:`, result);
                console.log(`[updateSlider] Mise à jour réussie pour ${attribute} = ${numericValue}`);
                return true;
            } else {
                console.error(`[updateSlider] Opérateur non trouvé (ID: ${operatorId})`);
                return false;
            }
        } catch (error) {
            console.error(`[updateSlider] Erreur lors de la mise à jour:`, error);
            return false;
        }
    }

    static initSliders() {
        console.log(`[initSliders] Initialisation des sliders...`);
        const sliders = document.querySelectorAll('.stat-slider');
        
        sliders.forEach(slider => {
            console.log(`[initSliders] Ajout listener pour slider:`, slider);
            
            slider.addEventListener('input', async function() {
                const value = this.value;
                const attribute = this.getAttribute('data-attribute');
                const operatorId = this.getAttribute('data-operator-id');
                
                console.log(`[Slider Event] Input détecté - Attr: ${attribute}, Valeur: ${value}, OpID: ${operatorId}`);
                
                // Mise à jour visuelle immédiate
                console.log(`[Slider Event] Mise à jour visuelle du span...`);
                this.nextElementSibling.textContent = value;
                
                // Sauvegarde
                console.log(`[Slider Event] Appel de updateSlider...`);
                const success = await Slider.updateSlider(attribute, value, operatorId);
                
                if (!success) {
                    console.warn(`[Slider Event] Échec de la mise à jour, revert visuel`);
                    this.nextElementSibling.textContent = this.value;
                } else {
                    console.log(`[Slider Event] Mise à jour réussie`);
                }
            });
        });
        
        console.log(`[initSliders] ${sliders.length} sliders initialisés`);
    }
}