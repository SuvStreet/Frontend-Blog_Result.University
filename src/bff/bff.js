import { getUser } from './get-user'
import { addUser } from './add-user'
import { createSession } from './create-session'

export const server = {
	async authorize(authLogin, authPassword) {
		const user = await getUser(authLogin)

		if (!user) {
			return {
				error: 'Пользователь не найден',
				res: null,
			}
		}

		if (user.password !== authPassword) {
			return {
				error: 'Неверный пароль',
				res: null,
			}
		}

		return {
			error: null,
			res: createSession(user.role_id),
		}
	},

	async register(regLogin, regPassword) {
		const user = await getUser(regLogin)

		if (user) {
			return {
				error: 'Такой логин уже существует',
				res: null,
			}
		}

		await addUser(regLogin, regPassword)

		return {
			error: null,
			res: createSession(user.role_id),
		}
	},
}
