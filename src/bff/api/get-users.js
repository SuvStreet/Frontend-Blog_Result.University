import { transformUser } from '../transformers'

export const getUsers = () =>
	fetch('http://localhost:5000/users')
		.then((loadedUsers) => loadedUsers.json())
		.then(
			(loadedUsers) =>
				loadedUsers && loadedUsers.map(transformUser),
		)
