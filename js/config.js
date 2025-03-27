export const ENDPOINT = 'http://localhost:3000';
export const ENDPOINT_OPERATORS = `${ENDPOINT}/operateurs`;
export const ENDPOINT_SPECIALTE = `${ENDPOINT}/specialite`;

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
