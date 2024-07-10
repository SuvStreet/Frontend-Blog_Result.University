export const request = (url, method = 'GET', data = null) => {
	return fetch(url, {
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		method,
		credentials: 'include',
		body: data && JSON.stringify(data),
	}).then((response) => response.json())
}
