import { useLayoutEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Header, Footer, Loader, Modal, Error } from './components'
import { Authorization, Registration, Users, Post, Main } from './pages'
import { setUser } from './actions'
import { selectLoading } from './selectors'
import { ERROR } from './constants'

import s from 'styled-components'

const AppColumn = s.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	max-width: 1000px;
	// width: 100%;
	min-height: 100dvh;
	margin: 0 auto;
	background-color: #242424;
	// color: black;
`

const Page = s.div`
	display: flex;
	justify-content: space-around;
	flex: 1 0 auto;
	padding: 20px 40px;
	// min-height: 500vh;
	// width: 100%;
`

export const Blog = () => {
	const dispatch = useDispatch()
	const isLoading = useSelector(selectLoading)

	useLayoutEffect(() => {
		const currentUserData = localStorage.getItem('currentUserData')
		if (currentUserData) {
			dispatch(setUser(JSON.parse(currentUserData)))
		}
	}, [dispatch])

	return isLoading ? (
		<Loader height={'100dvh'} />
	) : (
		<AppColumn>
			<Header />
			<Page>
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/login' element={<Authorization />} />
					<Route path='/register' element={<Registration />} />
					<Route path='/users' element={<Users />} />
					<Route path='/post' element={<Post />} />
					<Route path='/post/:id' element={<Post />} />
					<Route path='/post/:id/edit' element={<Post />} />
					<Route path='*' element={<Error error={ERROR.PAGE_NOT_FOUND} pageNotFound />} />
				</Routes>
			</Page>
			<Footer />
			<Modal />
		</AppColumn>
	)
}
