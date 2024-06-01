export const fetchAPI = async (url: string, options?: RequestInit) => {
	const response = await fetch(`${process.env.REACT_APP_API_URL}/${url}`, options).catch((error) => {
		localStorage.removeItem('accessToken');
	})

	if (response?.status === 401 && localStorage.getItem('accessToken')) {
		localStorage.removeItem('accessToken');
		window.location.href = '/login';
	}

	if (!response?.ok) {
		const errorText = await response?.text(); // Ler o corpo da resposta como texto
		let errorBody;
		try {
			errorBody = JSON.parse(errorText as string); // Tentar converter o texto em um objeto JSON
		} catch {
			throw errorText
		}
		throw new Error(errorBody.error);
	}
	return response;
}