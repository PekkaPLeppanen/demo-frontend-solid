async function getErrorMessage(response: Response): Promise<string> {
	const data = await response.json().catch(() => undefined);

	let errorMessage = response.statusText;

	if (data && data.message) {
		errorMessage = data.message as string;
	}

	return errorMessage;
}

async function parseResponse<TResponse>(
	response: Response,
): Promise<TResponse> {
	if (!response.ok) {
		return Promise.reject(await getErrorMessage(response));
	}

	return response.json();
}

export async function getData<TResponse>(url: string): Promise<TResponse> {
	return fetch(url).then(parseResponse<TResponse>);
}
