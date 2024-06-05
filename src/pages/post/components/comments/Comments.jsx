import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import PropTypes from 'prop-types'

import { selectUserId, selectUserLogin, selectUserRole } from '../../../../selectors'
import { Icon } from '../../../../components'
import { Comment } from './components'
import { useServerRequest } from '../../../../hooks'
import { addCommentAsync } from '../../../../actions'
import { checkAccess } from '../../../../utils'
import { PROP_TYPES, ROLE } from '../../../../constants'

import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import s from 'styled-components'

const CommentsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState('')
	const requestServer = useServerRequest()
	const userRole = useSelector(selectUserRole)
	const userId = useSelector(selectUserId)
	const userLogin = useSelector(selectUserLogin)
	const dispatch = useDispatch()

	const onNewCommentAdd = (userId, userLogin, postId, content) => {
		if (!checkAccess([ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER], userRole)) {
			return
		}

		if (newComment === '') return
		dispatch(addCommentAsync(requestServer, userId, userLogin, postId, content))
		setNewComment('')
	}

	const isGuest = checkAccess([ROLE.GUEST], userRole)

	return (
		<div className={className}>
			{!isGuest && (
				<div className='new-comment'>
					<textarea
						name='comment'
						placeholder='Комментарий...'
						value={newComment}
						onChange={({ target: { value } }) => setNewComment(value)}
					></textarea>
					<Icon
						fontSize='1.3rem'
						iconCode={faPaperPlane}
						margin='0 0 0 20px'
						onClick={() => onNewCommentAdd(userId, userLogin, postId, newComment)}
					/>
				</div>
			)}

			<div className='comments'>
				{comments.length === 0 ? (
					<span className='comments__not-found'>
						Комментариев ещё нет, давай добавим!
					</span>
				) : (
					comments.map(({ id, author, content, publishedAt }) => (
						<Comment
							key={id}
							commentId={id}
							author={author}
							content={content}
							publishedAt={publishedAt}
						/>
					))
				)}
			</div>
		</div>
	)
}

export const Comments = s(CommentsContainer)`
	width: 580px;
	margin: 10px auto 0;

	& .new-comment {
		display: flex;
		margin: 20px 0 0 0;
	}

	& .comments {

		display: flex;
		flex-direction: column;

		&__not-found {
			font-size: 20px;
			font-weight: bold;
			text-align: center;
			margin-right: 40px;
		}
	}

	& .new-comment textarea {
		width: 100%;
		height: 200px;
		height: 120px;
		font-size: 20px;
		resize: none;
		background: transparent;
		border-radius: 10px;
		padding: 10px;
		color: #fff;
	}
`

CommentsContainer.propTypes = {
	className: PropTypes.string.isRequired,
	comments: PropTypes.arrayOf(PROP_TYPES.COMMENTS).isRequired,
	postId: PropTypes.string,
}
