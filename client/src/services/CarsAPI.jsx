const API_URL = '/api';

export const fetchOptions = async () => {
    const response = await fetch(`${API_URL}/options`);
    return response.json();
};

export const fetchSavedCars = async () => {
    const response = await fetch(`${API_URL}/saved`);
    return response.json();
};

export const saveCar = async (carData) => {
    const response = await fetch(`${API_URL}/saved`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carData)
    });
    return response.json();
};

export const updateCar = async (id, carData) => {
    const response = await fetch(`${API_URL}/saved/${id}`, {
        method: 'PATCH', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carData)
    });
    return response.json();
};

export const deleteCar = async (id) => {
    const response = await fetch(`${API_URL}/saved/${id}`, {
        method: 'DELETE'
    });
    return response.json();
};