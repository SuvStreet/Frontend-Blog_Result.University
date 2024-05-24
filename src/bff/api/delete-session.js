export const deleteSession = async (sessionId) =>
	fetch(`http://localhost:5000/sessions/${sessionId}`, {
		method: 'DELETE',
	})
