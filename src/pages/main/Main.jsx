import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

import { useServerRequest } from '../../hooks'
import { PostCard } from './components'

import s from 'styled-components'
import { Input, Loader } from '../../components'

const MainContainer = ({ className }) => {
	const [loading, setLoading] = useState(true)
	const [posts, setPosts] = useState([])
	const requestServer = useServerRequest()

	useEffect(() => {
		// Promise.all([requestServer('fetchPosts'), requestServer('fetchComments')])
		// if(!session && !posts.length) {

		// }
		requestServer('fetchPosts')
			.then((postsRes) => {
				if (postsRes.error) {
					// setErrorMessage(usersRes.error || roleRes.error)
					return
				}

				setPosts(postsRes.res)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [requestServer])

	return (
		<div className={className}>
			{loading ? (
				<Loader />
			) : (
				<>
					<div className='search-panel'>
						<Input placeholder='Поиск постов...' width='520px' />
					</div>
					<div className='posts-list'>
						{posts.map(({ id, title, imgUrl, publishedAt, commentsCount }) => (
							<PostCard
								key={id}
								id={id}
								title={title}
								imgUrl={imgUrl}
								publishedAt={publishedAt}
								commentsCount={commentsCount}
							/>
						))}
					</div>
					<div className='pagination'></div>
				</>
			)}
		</div>
	)
}

export const Main = s(MainContainer)`
	padding: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;


	& .posts-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 40px;
		margin-top: 10px;
	}
`

MainContainer.propTypes = {
	className: PropTypes.string,
}
