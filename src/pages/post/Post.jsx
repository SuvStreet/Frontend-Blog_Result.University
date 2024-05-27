import { useEffect, useLayoutEffect, useState } from 'react'
import { useMatch, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import PropTypes from 'prop-types'

import { useServerRequest } from '../../hooks'
import { loadPostAsync,  REMOVE_POST } from '../../actions'
import { selectPost, selectUserSession } from '../../selectors'
import { PostContent, Comments, PostForm } from './components'
import { Loader } from '../../components'

import s from 'styled-components'

const PostContainer = ({ className }) => {
	const [isLoading, setIsLoading] = useState(false)
	const dispatch = useDispatch()
	const { id } = useParams()
	const isEditing = useMatch('/post/:id/edit')
	const isCreating = useMatch('/post')
	const requestServer = useServerRequest()
	const post = useSelector(selectPost)
	const session = useSelector(selectUserSession)

	useLayoutEffect(() => {
		dispatch(REMOVE_POST)
	}, [dispatch, isCreating])

	useEffect(() => {
		if(isCreating) {
			return
		}

		if (!post.id && !session || !isCreating && !post.id) {
			setIsLoading(true)
			dispatch(loadPostAsync(requestServer, id)).finally(() =>
				setIsLoading(false),
			)
		}
	}, [id, requestServer, dispatch, isCreating, session, post.id])

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className={className}>
					{isCreating || isEditing ? (
						<PostForm post={post} />
					) : (
						<>
							<PostContent post={post} />
							<Comments comments={post.comments} postId={post.id} />
						</>
					)}
				</div>
			)}
		</>
	)
}

export const Post = s(PostContainer)`
	margin: 40px 0;
	padding: 0 80px;
`

PostContainer.propTypes = {
	className: PropTypes.string,
}
