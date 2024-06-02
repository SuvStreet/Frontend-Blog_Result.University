import { getSession } from '../api'
import { ERROR } from '../constants'
import { sessions } from '../sessions'

export const fetchUser = async (hash) => {
	const activeSession = await getSession(hash)

	if (!activeSession) {
		return {
			error: ERROR.NO_SESSION,
			res: null,
		}
	}

	const { id, login, roleId } = activeSession.user

	sessions.add(hash, { id, login, roleId, session: hash })

	return {
		error: null,
		res: {
			id,
			login,
			roleId,
			session: hash,
		},
	}
}
