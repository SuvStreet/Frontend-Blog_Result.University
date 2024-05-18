export const setUserRole = (userId, newUserRoleId) =>
	fetch(`http://localhost:5000/users/${userId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			role_id: newUserRoleId,
		}),
	})
