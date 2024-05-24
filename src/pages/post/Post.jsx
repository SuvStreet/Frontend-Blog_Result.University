import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import PropTypes from 'prop-types'

import { useServerRequest } from '../../hooks'
import { loadPostAsync } from '../../actions'
import { selectPost } from '../../selectors'
import { PostContent, Comments } from './components'
import { Loader } from '../../components'

import s from 'styled-components'

const PostContainer = ({ className }) => {
	const dispatch = useDispatch()
	const { id } = useParams()
	const requestServer = useServerRequest()
	const post = useSelector(selectPost)

	useEffect(() => {
		dispatch(loadPostAsync(requestServer, id))
	}, [])
	
	return (
		<>
			{Object.values(post)[0] === '' ? (
				<Loader />
			) : (
				<div className={className}>
					<>
						<PostContent post={post} />
						<Comments comments={post.comments} postId={post.id} />
					</>
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
