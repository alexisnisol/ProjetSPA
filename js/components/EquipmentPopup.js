export default class EquipmentPopup {
    constructor() {
        this.popupElement = null;
    }

    init() {
        if (this.popupElement) return;
        
        this.popupElement = document.createElement('div');
        this.popupElement.id = 'equipmentPopup';
        this.popupElement.className = 'equipment-popup';
        this.popupElement.innerHTML = `
            <div class="popup-content">
                <span class="close-popup">&times;</span>
                <h3 class="popup-title"></h3>
                <div class="equipment-list"></div>
            </div>
        `;
        
        document.body.appendChild(this.popupElement);
        
        this.popupElement.querySelector('.close-popup').addEventListener('click', () => this.hide());
        this.popupElement.addEventListener('click', (e) => {
            if (e.target === this.popupElement) this.hide();
        });
    }

    show({title, items, folder, onSelect}) {
        if (!this.popupElement) this.init();
        
        this.popupElement.querySelector('.popup-title').textContent = title;
        
        const list = this.popupElement.querySelector('.equipment-list');
        list.innerHTML = items.map(item => `
            <div class="equipment-option" data-id="${item.id}">
                <img src="/static/img/${folder}/${item.image}" alt="${item.nom}">
                <p>${item.nom}</p>
            </div>
        `).join('');
        
        list.querySelectorAll('.equipment-option').forEach(option => {
            option.addEventListener('click', () => {
                onSelect(option.getAttribute('data-id'));
                this.hide();
            });
        });
        
        this.popupElement.style.display = 'flex';
    }

    hide() {
        if (this.popupElement) {
            this.popupElement.style.display = 'none';
        }
    }
}