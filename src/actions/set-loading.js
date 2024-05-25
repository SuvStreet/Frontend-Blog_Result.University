import { ACTION_TYPE } from './action-type'

export const setLoading = (statusLoading) => ({
	type: ACTION_TYPE.SET_LOADING,
	payload: statusLoading,
})
