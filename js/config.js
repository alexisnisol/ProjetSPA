export const ENDPOINT = 'http://localhost:3000';
export const ENDPOINT_OPERATORS = `${ENDPOINT}/operateurs`;
export const ENDPOINT_SPECIALTE = `${ENDPOINT}/specialite`;
export const ENDPOINT_ARMES = `${ENDPOINT}/armes`;
export const ENDPOINT_CLASSE_ARME = `${ENDPOINT}/classe_arme`;
export const ENDPOINT_GADGETS = `${ENDPOINT}/gadgets`;
export const ENDPOINT_CAPACITES = `${ENDPOINT}/capacite`;
export const ENDPOINT_SPECIALITE_OPERATEUR = `${ENDPOINT}/specialite_operateur`;

export const GET = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
};

export const POST = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

export const PUT = {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    }
};
