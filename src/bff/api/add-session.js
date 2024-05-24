export const addSession = (hash, user) =>
	fetch(`http://localhost:5000/sessions`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			hash,
			user: {
				id: user.id,
				login: user.login,
				role_id: user.roleId,
			},
		}),
	})
