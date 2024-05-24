import { transformSession } from '../transformers'

export const getSession = (hash) => {
	return fetch(`http://localhost:5000/sessions?hash=${hash}`)
		.then((loadedSessions) => loadedSessions.json())
		.then(([loadedSession]) => loadedSession && transformSession(loadedSession))
}
