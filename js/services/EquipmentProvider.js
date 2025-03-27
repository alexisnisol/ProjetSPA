import WeaponProvider from "./WeaponProvider.js";
import GadgetProvider from "./GadgetProvider.js";
import CapacityProvider from "./CapacityProvider.js";

export default class EquipmentProvider {
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