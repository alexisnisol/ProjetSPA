export default class EquipmentGrid {
    static render(equipment) {
        return /*html*/`
            <div class="equipment-grid">
                ${this.renderEquipmentCategory('ARME PRINCIPALE', equipment.primaryWeapons, 'weapons')}
                ${this.renderEquipmentCategory('ARME SECONDAIRE', equipment.secondaryWeapons, 'weapons')}
                ${this.renderEquipmentCategory('GADGET', [equipment.gadget], 'gadgets')}
                ${this.renderEquipmentCategory('CAPACITÉ', [equipment.capacity], 'ability')}
            </div>
        `;
    }

    static renderEquipmentCategory(title, items, folder) {
        const validItems = items.filter(item => item?.nom);
        if (validItems.length === 0) return '';
        
        return /*html*/`
            <div class="equipment-category">
                <h3 class="equipment-title">${title}</h3>
                <div class="equipment-items">
                    ${validItems.map(item => this.renderEquipmentItem(item, folder)).join('')}
                </div>
            </div>
        `;
    }

    static renderEquipmentItem(item, folder) {
        return /*html*/`
            <div class="equipment-item">
                <img src="/static/img/${folder}/${item.image}" alt="${item.nom}" class="equipment-image">
                <div class="equipment-info">
                    <p class="equipment-name">${item.nom}</p>
                    ${item.class ? `<p class="equipment-class">${item.class.nom}</p>` : ''}
                </div>
            </div>
        `;
    }
}