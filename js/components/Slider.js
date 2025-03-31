import OperatorProvider from '../services/providers/OperatorProvider.js'

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
                    const errorMsg = `Valeur invalide ${numericValue}. Doit être entre 1 et 3`;
                    throw new Error(errorMsg);
                }
    
                const updatedData = {
                    ...operator,
                    [attribute]: numericValue
                };
                
                const result = await OperatorProvider.updateOperator(operatorId, updatedData);
                
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    }

    static initSliders() {
        const sliders = document.querySelectorAll('.stat-slider');
        
        sliders.forEach(slider => {
            // Mise à jour initiale
            Slider.updateSliderStyle(slider);
            
            slider.addEventListener('input', async function() {
                const value = this.value;
                const attribute = this.getAttribute('data-attribute');
                const operatorId = this.getAttribute('data-operator-id');
                
                this.nextElementSibling.textContent = value;
                
                Slider.updateSliderStyle(this);
                
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
    
    static updateSliderStyle(slider) {
        const min = slider.min ? parseInt(slider.min) : 0;
        const max = slider.max ? parseInt(slider.max) : 100;
        const value = parseInt(slider.value);
        const percent = ((value - min) / (max - min)) * 100;
        slider.style.setProperty('--fill-percent', `${percent}%`);
    }
}