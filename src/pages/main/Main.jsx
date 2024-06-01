import { useEffect, useMemo, useState } from 'react'

import PropTypes from 'prop-types'

import { useServerRequest } from '../../hooks'
import { PostCard, Pagination, Search } from './components'
import { Loader } from '../../components'
import { PAGINATION_LIMIT } from '../../constants'
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
				console.log('lastPage', lastPage)
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
			{loading ? (
				<Loader />
			) : (
				<>
					<Search searchPhrase={searchPhrase} onChange={onSearch} />
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
						<div className='no-post-found'>Ничего не найдено</div>
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
	padding: 20px 40px;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	align-items: center;

	& .posts-list {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		gap: 40px;
		margin-top: 20px;
	}

	& .no-post-found {
		margin-top: 20px;
		font-size: 20px;
		font-weight: bold;
	}
`

MainContainer.propTypes = {
	className: PropTypes.string,
}
