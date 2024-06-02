import { getUser, addUser } from '../api'
import { ERROR } from '../constants'
import { sessions } from '../sessions'

export const register = async (regLogin, regPassword) => {
	const existedUser = await getUser(regLogin)

	if (existedUser) {
		return {
			error: ERROR.EXISTED_USER,
			res: null,
		}
	}

	const user = await addUser(regLogin, regPassword)

	const createdUser = {
		id: user.id,
		login: user.login,
		roleId: user.role_id,
	}

	return {
		error: null,
		res: {
			id: user.id,
			login: user.login,
			roleId: user.role_id,
			session: sessions.create(createdUser),
		},
	}
}
