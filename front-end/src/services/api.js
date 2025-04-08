const API_BASE_URL = 'http://localhost:3000/api';
const token = localStorage.getItem("token");

export const fetchProducts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/produits`, {
            method: 'GET',
            headers: {
                Authorization : `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Erreur API: ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error("Erreur lors de la récupération des produits : ", error);
        throw error;
    }
};

export const fetchProductById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/produits/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Erreur API: ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error(`Erreur lors de la récupération du produit ${id} : `, error);
        throw error;
    }
};

export const addProduct = async (data) => {
    try {
        const response = await fetch(`${API_BASE_URL}/produits`, {
            method: 'POST',
            body: data,
        });

        if (!response.ok) {
            throw new Error(`Erreur API: ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error(`Erreur lors de la création du produit.`);
    }
}

export const fetchCategories = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Erreur API: ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error(`Erreur lors de la récupération du produit ${id} : `, error);
        throw error;
    }
};

export const addCategory = async (data) => {
    try {
        const response = await fetch(`${API_BASE_URL}/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Erreur API: ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error(`Erreur lors de la récupération des commandes : `, error);
        throw error;
    }
}

export const deleteCategory = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Erreur API: ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error(`Erreur lors de la récupération des commandes : `, error);
        throw error;
    }
}

export const fetchCommands = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/commands`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Erreur API: ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error(`Erreur lors de la récupération des commandes : `, error);
        throw error;
    }
}

export const loginUser = async ({ mail, password }) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ mail, password }),
    });

    if (!response.ok) {
        throw new Error("Échec de la connexion.");
    }

    return await response.json();
};