export const transformSession = (dbSession) => {
	return {
		id: dbSession.id,
		user: {
			id: dbSession.user.id,
			login: dbSession.user.login,
			roleId: dbSession.user.role_id,
		},
	}
}
