import { ENDPOINT, ENDPOINT_SPECIALTE, GET } from '../config.js';

export default class SpecialtyProvider {
    static async fetchRequest(url, http_request) {
        try {
            const response = await fetch(url, http_request);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (err) {
            console.error('Fetch error:', err);
            return null;
        }
    }

    static async getAllSpecialties() {
        return await this.fetchRequest(ENDPOINT_SPECIALTE, GET);
    }

    static async getSpecialtiesForOperator(operatorId) {
        try {
            const relations = await this.fetchRequest(
                `${ENDPOINT}/specialite_operateur`, 
                GET
            );
            
            if (!Array.isArray(relations)) return [];

            const specialties = await this.getAllSpecialties();
            if (!Array.isArray(specialties)) return [];

            return relations
                .filter(rel => parseInt(rel.operateur_id) === parseInt(operatorId))
                .map(rel => {
                    const spec = specialties.find(s => 
                        parseInt(s.id) === parseInt(rel.specialite_id)
                    );
                    return spec?.name;
                })
                .filter(Boolean);
                
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }
}