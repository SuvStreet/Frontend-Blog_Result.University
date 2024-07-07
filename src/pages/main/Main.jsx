import PropTypes from 'prop-types'
import { useEffect, useMemo, useState } from 'react'

import { PostCard, Pagination, Search } from './components'
import { Error, Loader } from '../../components'
import { ERROR, PAGINATION_LIMIT } from '../../constants'
import { debounce } from './components/utils'
import { request } from '../../utils'

import s from 'styled-components'

const MainContainer = ({ className }) => {
	const [loading, setLoading] = useState(true)
	const [posts, setPosts] = useState([])
	const [page, setPage] = useState(1)
	const [lastPage, setLastPage] = useState(1)
	const [shouldSearch, setShouldSearch] = useState(false)
	const [searchPhrase, setSearchPhrase] = useState('')

	useEffect(() => {
		request(`/api/posts?search=${searchPhrase}&_page=${page}&_limit=${PAGINATION_LIMIT}`)
			.then(({ data: { post, lastPage } }) => {
				setPosts(post)
				setLastPage(lastPage)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [page, shouldSearch])

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
							{posts.map(({ id, title, imgUrl, publishedAt, comments }) => (
								<PostCard
									key={id}
									id={id}
									title={title}
									imgUrl={imgUrl}
									publishedAt={publishedAt}
									comments={comments.length}
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
	className: PropTypes.string.isRequired,
}
