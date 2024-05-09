import { fetchAPI } from "./fetchAPI";

export const getUser = async () => {
	const token = localStorage.getItem('accessToken');
	const data = await fetchAPI('user', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});

	return data.json();
}