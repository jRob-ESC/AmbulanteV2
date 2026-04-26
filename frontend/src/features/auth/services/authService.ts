import { API_URL } from "@/config/api";

export async function login(email: string, password: string) {
    const credentials = btoa(`${email}:${password}`);

    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${credentials}`,
        },
    });

    if (!response.ok) {
        const error: any = new Error('Credenciales incorrectas');
        error.status = response.status;
        throw error;
    }

    const user = await response.json();
    return {
        ...user,
        imgUrl: user.imgUrl ? `${API_URL}${user.imgUrl}` : null
    };
}

export async function register(firstName: string, lastName: string, email: string, password: string) {
    const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
    });

    if (!response.ok) {
        const error: any = new Error('Error al registrarse');
        error.status = response.status;
        throw error;
    }
}