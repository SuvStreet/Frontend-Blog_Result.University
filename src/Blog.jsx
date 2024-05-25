import { useLayoutEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Header, Footer, Loader, Modal } from './components'
import { Authorization, Registration, Users, Post } from './pages'
import { useServerRequest } from './hooks'
import { setLoading, setUser } from './actions'
import { selectLoading, selectUserSession } from './selectors'

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
	// padding-top: 20px;
	// min-height: 500vh;
	// width: 100%;
`

export const Blog = () => {
	const dispatch = useDispatch()
	const session = useSelector(selectUserSession)
	const loading = useSelector(selectLoading)
	const requestServer = useServerRequest()
	const currentUserData = localStorage.getItem('currentUserData')

	useLayoutEffect(() => {
		if (currentUserData !== null && session === null) {

			dispatch(setLoading, true)
			requestServer('fetchUser', JSON.parse(currentUserData))
				.then(({ res }) => {
					dispatch(setUser(res))
				})
				.finally(() => dispatch(setLoading, false))
		}
	}, [currentUserData, dispatch, requestServer, session])

	return loading ? (
		<Loader height={'100dvh'} />
	) : (
		<AppColumn>
			<Header />
			<Page>
				<Routes>
					<Route path='/' element={<div>Главная страница</div>} />
					<Route path='/login' element={<Authorization />} />
					<Route path='/register' element={<Registration />} />
					<Route path='/users' element={<Users />} />
					<Route path='/post' element={<div>Новая Статья</div>} />
					<Route path='/post/:id' element={<Post />} />
					<Route path='/post/:id/edit' element={<Post />} />
					<Route path='*' element={<div>Ошибка</div>} />
				</Routes>
			</Page>
			<Footer />
			<Modal />
		</AppColumn>
	)
}
