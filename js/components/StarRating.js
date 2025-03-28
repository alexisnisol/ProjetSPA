import OperatorProvider from '../services/providers/OperatorProvider.js'

export default class StarRating {
    static render(operator) {
        const currentRating = operator.note || 0;
        
        return /*html*/ `
            <div class="star-rating" data-attribute="note" data-operator-id="${operator.id}">
                ${Array.from({length: 5}, (_, i) => i + 1)
                    .map(starValue => /*html*/ `
                        <span class="star ${starValue <= currentRating ? 'active' : ''}" 
                              data-value="${starValue}">★</span>`).join('')}
            </div>
        `;
    }

    static async updateRating(value, operatorId) {
        try {
            const operator = await OperatorProvider.getOperator(operatorId);
            
            if (operator) {
                const numericValue = parseInt(value, 10);
                
                if (numericValue < 0 || numericValue > 5) {
                    throw new Error('Valeur invalide');
                }

                const updatedData = {
                    ...operator,
                    note: numericValue
                };
                
                return await OperatorProvider.updateOperator(operatorId, updatedData);
            }
            return false;
        } catch (error) {
            console.error('Erreur de mise à jour:', error);
            return false;
        }
    }

    static initStarRatings() {
        const ratings = document.querySelectorAll('.star-rating');
        
        ratings.forEach(ratingContainer => {
            const stars = ratingContainer.querySelectorAll('.star');
            const valueDisplay = ratingContainer.querySelector('.value');
            
            stars.forEach(star => {
                star.addEventListener('click', async () => {
                    const newValue = star.getAttribute('data-value');
                    const operatorId = ratingContainer.getAttribute('data-operator-id');
                    
                    stars.forEach((s, index) => {
                        s.classList.toggle('active', index < newValue);
                    });
                    valueDisplay.textContent = newValue;
                    
                    const success = await StarRating.updateRating(newValue, operatorId);
                    
                    if (!success) {
                        const originalValue = valueDisplay.textContent;
                        stars.forEach((s, index) => {
                            s.classList.toggle('active', index < originalValue);
                        });
                    }
                });
            });
        });
    }
}