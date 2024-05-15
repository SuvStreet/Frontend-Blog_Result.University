export const getUser = async (loginToFind) =>
	fetch(`http://localhost:5000/users?login=${loginToFind}`).then((loadedUser) =>
		loadedUser.json().then(([loadedUser]) => loadedUser),
	)

