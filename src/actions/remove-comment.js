import { ACTION_TYPE } from './action-type'

export const removeComment = (removedIdComment) => ({
	type: ACTION_TYPE.DELETE_COMMENT,
	payload: removedIdComment,
})
