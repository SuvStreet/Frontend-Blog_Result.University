export const deleteUser = (userId) =>
	fetch(`http://localhost:5000/users/${userId}`, {
		method: 'DELETE',
	})
