import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import PropTypes from 'prop-types'

import { selectUserId, selectUserLogin } from '../../../../selectors'
import { Icon } from '../../../../components'
import { Comment } from './components'
import { useServerRequest } from '../../../../hooks'
import { addCommentAsync } from '../../../../actions'

import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import s from 'styled-components'

const CommentsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState('')
	const requestServer = useServerRequest()
	const userId = useSelector(selectUserId)
	const userLogin = useSelector(selectUserLogin)
	const dispatch = useDispatch()

	const onNewCommentAdd = (userId, userLogin, postId, content) => {
		if (newComment === '') return
		dispatch(addCommentAsync(requestServer, userId, userLogin, postId, content))
		setNewComment('')
	}

	return (
		<div className={className}>
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

			<div className='comments'>
				{comments.map(({ id, author, content, publishedAt }) => (
					<Comment
						key={id}
						id={id}
						author={author}
						content={content}
						publishedAt={publishedAt}
					/>
				))}
			</div>
		</div>
	)
}

export const Comments = s(CommentsContainer)`
	width: 580px;
	margin: 30px auto 0;

	& .new-comment {
		display: flex;
		margin: 20px 0;
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
	className: PropTypes.string,
	comments: PropTypes.array,
	postId: PropTypes.string,
}
