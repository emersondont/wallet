import { fetchAPI } from "./fetchAPI";

export const login = async (email: string, password: string) => {
	const response = await fetchAPI('auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password })
	})

	return response.json();
}

export const register = async (name: string, email: string, password: string) => {
	await fetchAPI('auth/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name, email, password })
	});

	// return data.json();
}