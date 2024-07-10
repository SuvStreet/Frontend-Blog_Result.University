import { URL } from '../constants'
import { request } from '../utils'
import { ACTION_TYPE } from './action-type'

export const logout = () => {
	request(`${URL.API}logout`, 'POST')

	return {
		type: ACTION_TYPE.LOGOUT,
	}
}
