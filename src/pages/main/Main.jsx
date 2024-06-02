import { useEffect, useMemo, useState } from 'react'

import PropTypes from 'prop-types'

import { useServerRequest } from '../../hooks'
import { PostCard, Pagination, Search } from './components'
import { Error, Loader } from '../../components'
import { ERROR, PAGINATION_LIMIT } from '../../constants'
import { debounce } from './components/utils'

import s from 'styled-components'

const MainContainer = ({ className }) => {
	const [loading, setLoading] = useState(true)
	const [posts, setPosts] = useState([])
	const [page, setPage] = useState(1)
	const [lastPage, setLastPage] = useState(1)
	const [shouldSearch, setShouldSearch] = useState(false)
	const [searchPhrase, setSearchPhrase] = useState('')
	const requestServer = useServerRequest()

	useEffect(() => {
		requestServer('fetchPosts', searchPhrase, page, PAGINATION_LIMIT)
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
	}, [requestServer, page, shouldSearch])

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), [])

	const onSearch = ({ target: { value } }) => {
		setSearchPhrase(value)
		startDelayedSearch(!shouldSearch)
	}

	return (
		<div className={className}>
			<Search searchPhrase={searchPhrase} onChange={onSearch} />
			{loading ? (
				<Loader />
			) : (
				<>
					{posts.length ? (
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
					) : (
						<div className='no-post-found'>
							<Error error={ERROR.NO_DATA_SEARCH} noDataSearch />
						</div>
					)}
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
	display: flex;
	flex-direction: column;
	align-items: center;

	& .posts-list {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 40px;
		margin-top: 20px;
	}

	& .no-post-found {
		flex: 1 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;
		font-weight: bold;
	}
`

MainContainer.propTypes = {
	className: PropTypes.string,
}
