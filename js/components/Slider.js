import OperatorProvider from "../services/OperatorProvider.js";

export default class Slider {
    static render(operator) {
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
        try {
            const operator = await OperatorProvider.getOperator(operatorId);
            
            if (operator) {
                const numericValue = parseInt(value, 10);
                
                if (numericValue < 1 || numericValue > 3) {
                    throw new Error("Valeur invalide. Doit être 1, 2 ou 3");
                }
    
                const updatedData = {
                    ...operator,
                    [attribute]: numericValue
                };
                
                console.log("Envoi des données:", updatedData);
                const result = await OperatorProvider.updateOperator(operatorId, updatedData);
                console.log("Mise à jour réussie", result);
                return true;
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour:", error);
            return false;
        }
    }

    static initSliders() {
        const sliders = document.querySelectorAll('.stat-slider');
        
        sliders.forEach(slider => {
            slider.addEventListener('change', async function() {
                const value = this.value;
                const attribute = this.getAttribute('data-attribute');
                const operatorId = this.getAttribute('data-operator-id');
                
                // Mise à jour visuelle immédiate
                this.nextElementSibling.textContent = value;
                
                // Sauvegarde
                const success = await Slider.updateSlider(attribute, value, operatorId);
                
                if (!success) {
                    // Revert visuel si échec
                    this.value = this.nextElementSibling.textContent;
                }
            });
        });
    }
}