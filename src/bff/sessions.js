import { addSession, getSession, deleteSession } from './api'

export const sessions = {
	list: {},

	create(user) {
		const hash = Math.random().toFixed(50)

		addSession(hash, user)
		this.list[hash] = user

		return hash
	},

	async remove(hash) {
		const session = await getSession(hash)

		if (!session) {
			return
		}

		deleteSession(session.id)
		delete this.list[hash]
	},

	add(hash, user) {
		this.list[hash] = user
	},

	access(hash, accessRoles) {
		const user = this.list[hash]
		
		return !!user && accessRoles.includes(user.roleId)
	},
}
