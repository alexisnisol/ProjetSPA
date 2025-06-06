import EquipmentPopup from './EquipmentPopup.js';
import WeaponProvider from '../services/providers/WeaponProvider.js';
import GadgetProvider from '../services/providers/GadgetProvider.js';
import OperatorProvider from '../services/providers/OperatorProvider.js';

export default class EquipmentGrid {
    static popup = new EquipmentPopup();
    static currentOperator = null;

    static init(operator) {
        this.currentOperator = operator;
        this.popup.init();
    }

    static render(equipment, operator) {
        this.init(operator);
        
        return /*html*/`
            <div class="equipment-grid">
                ${this.renderEquipmentCategory('ARME PRINCIPALE', equipment.primaryWeapons, 'weapons', 'arme_principale')}
                ${this.renderEquipmentCategory('ARME SECONDAIRE', equipment.secondaryWeapons, 'weapons', 'arme_secondaire')}
                ${this.renderEquipmentCategory('GADGET', [equipment.gadget], 'gadgets', 'gadget')}
                ${this.renderEquipmentCategory('CAPACITÉ', [equipment.capacity], 'ability', 'capacity', true)}
            </div>
        `;
    }

    static renderEquipmentCategory(title, items, folder, fieldName, isDisabled = false) {
        const validItems = items.filter(item => item?.nom);
        if (validItems.length === 0) return '';
        
        return /*html*/`
            <div class="equipment-category ${isDisabled ? 'disabled-category' : ''}">
                <h3 class="equipment-title">${title}</h3>
                <div class="equipment-items">
                    ${validItems.map(item => this.renderEquipmentItem(item, folder, fieldName, isDisabled)).join('')}
                </div>
            </div>
        `;
    }

    static renderEquipmentItem(item, folder, fieldName, isDisabled = false) {
        return /*html*/`
            <div class="equipment-item ${isDisabled ? 'disabled-item' : ''}" 
                 data-field="${fieldName}" 
                 onclick="${isDisabled ? '' : `EquipmentGrid.handleEquipmentClick('${fieldName}')`}">
                <img loading="lazy" src="/static/img/${folder}/${item.image}" alt="${item.nom}" class="equipment-image">
                <div class="equipment-info">
                    <p class="equipment-name">${item.nom}</p>
                    ${item.class ? `<p class="equipment-class">${item.class.nom}</p>` : ''}
                </div>
            </div>
        `;
    }

    static async handleEquipmentClick(fieldName) {
        try {
            if (fieldName === 'capacity') return;
            
            let items = [], folder = 'weapons';
            
            if (fieldName === 'arme_principale') {
                items = await WeaponProvider.getAllWeapons('primary');
            } else if (fieldName === 'arme_secondaire') {
                items = await WeaponProvider.getAllWeapons('secondary');
            } else if (fieldName === 'gadget') {
                items = await GadgetProvider.getAllGadgets();
                folder = 'gadgets';
            }
            
            if (items.length > 0) {
                this.popup.show({
                    title: this.getPopupTitle(fieldName),
                    items: items,
                    folder: folder,
                    onSelect: (selectedId) => this.updateEquipment(fieldName, selectedId)
                });
            }
        } catch (error) {
            console.error('Error loading equipment:', error);
            alert("Erreur lors du chargement des équipements");
        }
    }

    static getPopupTitle(fieldName) {
        const titles = {
            'arme_principale': 'UNE ARME PRINCIPALE',
            'arme_secondaire': 'UNE ARME SECONDAIRE', 
            'gadget': 'UN GADGET'
        };
        return `SÉLECTIONNER ${titles[fieldName]}`;
    }

    static async updateEquipment(fieldName, newId) {
        try {
            const updateData = await OperatorProvider.getOperator(this.currentOperator.id);

            if (fieldName === 'arme_principale' || fieldName === 'arme_secondaire') {
                updateData[fieldName] = [newId];
            } else if (fieldName === 'gadget') {
                updateData[fieldName] = newId;
            }
            
            await OperatorProvider.updateOperator(this.currentOperator.id, updateData);
            window.location.reload();
        } catch (error) {
            console.error('Error updating equipment:', error);
            alert("Erreur lors de la mise à jour");
        }
    }
}

window.EquipmentGrid = EquipmentGrid;