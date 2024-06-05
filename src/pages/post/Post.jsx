import PropTypes from 'prop-types'
import { useEffect, useLayoutEffect, useState } from 'react'
import { useMatch, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { useServerRequest } from '../../hooks'
import { loadPostAsync, REMOVE_POST } from '../../actions'
import { selectPost, selectUserSession } from '../../selectors'
import { PostContent, Comments, PostForm } from './components'
import { Error, Loader } from '../../components'

import s from 'styled-components'

const PostContainer = ({ className }) => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)
	const dispatch = useDispatch()
	const { id } = useParams()
	const isEditing = !!useMatch('/post/:id/edit')
	const isCreating = !!useMatch('/post')
	const requestServer = useServerRequest()
	const post = useSelector(selectPost)
	const session = useSelector(selectUserSession)

	useLayoutEffect(() => {
		dispatch(REMOVE_POST)
	}, [dispatch, isCreating])

	useEffect(() => {
		if (isCreating) {
			return
		}

		if ((!post.id && !session) || (!isCreating && !post.id)) {
			setIsLoading(true)
			dispatch(loadPostAsync(requestServer, id))
				.then((postData) => {
					if (postData.error) {
						setError(postData.error)
					}
				})
				.finally(() => setIsLoading(false))
		}
	}, [id, requestServer, dispatch, isCreating, session, post.id])

	return (
		<div className={className}>
			{isLoading ? (
				<Loader />
			) : error ? (
				<>
					<Error error={error} spin />
				</>
			) : (
				<>
					{isCreating || isEditing ? (
						<PostForm post={post} />
					) : (
						<>
							<PostContent post={post} />
							<Comments comments={post.comments} postId={post.id} />
						</>
					)}
				</>
			)}
		</div>
	)
}

export const Post = s(PostContainer)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

PostContainer.propTypes = {
	className: PropTypes.string.isRequired,
}
