import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

import { useServerRequest } from '../../hooks'
import { PostCard, Pagination } from './components'
import { Input, Loader } from '../../components'
import { PAGINATION_LIMIT } from '../../constants'

import s from 'styled-components'

const MainContainer = ({ className }) => {
	const [loading, setLoading] = useState(true)
	const [posts, setPosts] = useState([])
	const [page, setPage] = useState(1)
	const [lastPage, setLastPage] = useState(1)
	const requestServer = useServerRequest()

	useEffect(() => {
		requestServer('fetchPosts', page, PAGINATION_LIMIT)
			.then(({ error, res: { posts, lastPage } }) => {
				if (error) {
					// setErrorMessage(usersRes.error || roleRes.error)
					return
				}

				setPosts(posts)
				setLastPage(lastPage)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [requestServer, page])

	return (
		<div className={className}>
			{loading ? (
				<Loader height='calc(100dvh - 342px)' />
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
				</>
			)}
			{lastPage > 1 && (
				<Pagination
					page={page}
					lastPage={lastPage}
					setPage={setPage}
					setLoading={setLoading}
				/>
			)}
		</div>
	)
}

export const Main = s(MainContainer)`
	padding: 20px;
	display: flex;
	justify-content: space-between;
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
