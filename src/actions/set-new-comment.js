import { ACTION_TYPE } from "./action-type";

export const setNewComment = (newComment) => ({
	type: ACTION_TYPE.SET_NEW_COMMENT,
	payload: newComment,
})
