import EquipmentPopup from './EquipmentPopup.js';
import WeaponProvider from '../services/providers/WeaponProvider.js';
import GadgetProvider from '../services/providers/GadgetProvider.js';
import OperatorProvider from '../services/providers/OperatorProvider.js';
import EquipmentProvider from '../services/providers/EquipmentProvider.js';

export default class EquipmentGrid {
    static popup = new EquipmentPopup();
    static currentOperator = null;

    static init(operator) {
        this.currentOperator = operator;
        this.popup.init();
    }

    static async render(equipment, operator) {
        this.init(operator);
        
        return /*html*/`
            <div class="equipment-grid">
                ${await this.renderEquipmentCategory('ARME PRINCIPALE', equipment.primaryWeapons, 'weapons', 'arme_principale')}
                ${await this.renderEquipmentCategory('ARME SECONDAIRE', equipment.secondaryWeapons, 'weapons', 'arme_secondaire')}
                ${await this.renderEquipmentCategory('GADGET', [equipment.gadget], 'gadgets', 'gadget')}
                ${await this.renderEquipmentCategory('CAPACITÉ', [equipment.capacity], 'ability', 'capacity')}
            </div>
        `;
    }

    static async renderEquipmentCategory(title, items, folder, fieldName) {
        const validItems = items.filter(item => item?.nom);
        if (validItems.length === 0) return '';
        
        return /*html*/`
            <div class="equipment-category">
                <h3 class="equipment-title">${title}</h3>
                <div class="equipment-items">
                    ${validItems.map(item => this.renderEquipmentItem(item, folder, fieldName)).join('')}
                </div>
            </div>
        `;
    }

    static renderEquipmentItem(item, folder, fieldName) {
        return /*html*/`
            <div class="equipment-item" 
                 data-field="${fieldName}" 
                 onclick="EquipmentGrid.handleEquipmentClick('${fieldName}')">
                <img src="/static/img/${folder}/${item.image}" alt="${item.nom}" class="equipment-image">
                <div class="equipment-info">
                    <p class="equipment-name">${item.nom}</p>
                    ${item.class ? `<p class="equipment-class">${item.class.nom}</p>` : ''}
                </div>
            </div>
        `;
    }

    static async handleEquipmentClick(fieldName) {
        try {
            let items = [], folder = 'weapons';
            
            if (fieldName === 'arme_principale') {
                items = await WeaponProvider.getAllWeapons('primary');
            } else if (fieldName === 'arme_secondaire') {
                items = await WeaponProvider.getAllWeapons('secondary');
            } else if (fieldName === 'gadget') {
                items = await GadgetProvider.getAllGadgets();
                folder = 'gadgets';
            }
            
            this.popup.show({
                title: this.getPopupTitle(fieldName),
                items: items,
                folder: folder,
                onSelect: async (selectedId) => {
                    await this.updateEquipment(fieldName, selectedId);
                    // Rafraîchir uniquement la section équipement
                    await this.refreshEquipment();
                }
            });
        } catch (error) {
            console.error('Error loading equipment:', error);
            alert("Erreur lors du chargement des équipements");
        }
    }

    static async refreshEquipment() {
        if (!this.currentOperator) return;
        
        const updatedOperator = await OperatorProvider.getOperator(this.currentOperator.id);
        const equipment = await EquipmentProvider.getOperatorEquipment(updatedOperator);
        const equipmentContainer = document.querySelector('.equipment-grid');
        
        if (equipmentContainer) {
            equipmentContainer.innerHTML = await this.render(equipment, updatedOperator);
            this.currentOperator = updatedOperator;
        }
    }

    static getPopupTitle(fieldName) {
        const titles = {
            'arme_principale': 'ARME PRINCIPALE',
            'arme_secondaire': 'ARME SECONDAIRE', 
            'gadget': 'GADGET'
        };
        return `Sélectionner ${titles[fieldName]}`;
    }

    static async updateEquipment(fieldName, newId) {
        try {
            if (!this.currentOperator) {
                throw new Error("Aucun opérateur sélectionné");
            }
            
            const updateData = {};
            
            if (fieldName === 'arme_principale' || fieldName === 'arme_secondaire') {
                updateData[fieldName] = [newId];
            } else {
                updateData[fieldName] = newId;
            }
            
            await OperatorProvider.updateOperator(this.currentOperator.id, updateData);
            
        } catch (error) {
            console.error('Error updating equipment:', error);
            throw error;
        }
    }
}

window.EquipmentGrid = EquipmentGrid;