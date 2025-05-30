const URL = import.meta.env.VITE_URL as string;

class API {
	static async get<T>(relativeRoute: string, token?: string): Promise<[Response, T]> {
		const option = {
			method: "GET",
			headers: generateHeader(token),
		} as RequestInit;

		const res = await fetch(`${URL}${relativeRoute}`, option);
		const data = (await res.json().catch(() => ({}))) as T;

		return [res, data];
	}
	static async put<T>(relativeRoute: string, body: object, token?: string): Promise<[Response, T]> {
		const option = {
			method: "PUT",
			headers: generateHeader(token),
			body: JSON.stringify(body),
		} as RequestInit;

		const res = await fetch(`${URL}${relativeRoute}`, option);
		const data = (await res.json().catch(() => ({}))) as T;

		return [res, data];
	}
	static async post<T>(
		relativeRoute: string,
		body: object,
		token?: string
	): Promise<[Response, T]> {
		const option = {
			method: "POST",
			headers: generateHeader(token),
			body: JSON.stringify(body),
		} as RequestInit;

		const res = await fetch(`${URL}${relativeRoute}`, option);
		const data = (await res.json().catch(() => ({}))) as T;

		return [res, data];
	}
	static async delete<T>(relativeRoute: string, token: string): Promise<[Response, T]> {
		const option = {
			method: "DELETE",
			headers: generateHeader(token),
		} as RequestInit;

		const res = await fetch(`${URL}${relativeRoute}`, option);
		const data = (await res.json().catch(() => ({}))) as T;

		return [res, data];
	}
}

function generateHeader(token?: string) {
	if (token)
		return {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		};
	else
		return {
			"Content-Type": "application/json",
		};
}

export { API };
