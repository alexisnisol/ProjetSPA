import WeaponProvider from "./WeaponProvider.js";
import GadgetProvider from "./GadgetProvider.js";
import CapacityProvider from "./CapacityProvider.js";

/**
 * Classe fournissant des services pour la gestion de l'équipement des opérateurs
 */
export default class EquipmentProvider {

    /**
     * Récupère l'équipement complet d'un opérateur
     * @param {Object} operator - L'opérateur dont on veut l'équipement
     * @returns {Promise<Object>} Un objet contenant armes, gadgets et capacité
     * @example
     * // Renvoie { primaryWeapons: [...], secondaryWeapons: [...], gadget: {...}, capacity: {...} }
     * const equipment = await EquipmentProvider.getOperatorEquipment(operator);
     */
    static async getOperatorEquipment(operator) {
        try {
            const [primaryWeapons, secondaryWeapons, gadget, capacity] = await Promise.all([
                Promise.all((operator.arme_principale || []).map(id => WeaponProvider.getWeaponById(id))),
                Promise.all((operator.arme_secondaire || []).map(id => WeaponProvider.getWeaponById(id))),
                GadgetProvider.getGadgetById(operator.gadget),
                CapacityProvider.getCapacityById(operator.capacite_id)
            ]);

            await Promise.all(primaryWeapons.map(async weapon => {
                if (weapon?.classe_arme) {
                    weapon.class = await WeaponProvider.getWeaponClassById(weapon.classe_arme);
                }
            }));

            return {
                primaryWeapons: primaryWeapons.filter(Boolean),
                secondaryWeapons: secondaryWeapons.filter(Boolean),
                gadget: gadget || {},
                capacity: capacity || {}
            };
            
        } catch (error) {
            console.error("Erreur de chargement de l'équipement:", error);
            return {
                primaryWeapons: [],
                secondaryWeapons: [],
                gadget: {},
                capacity: {}
            };
        }
    }
}