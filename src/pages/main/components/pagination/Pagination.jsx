import PropTypes from 'prop-types'

import { Button } from '../../../../components'

import s from 'styled-components'

const PaginationContainer = ({ className, page, lastPage, setPage, setLoading }) => {
	return (
		<div className={className}>
			<Button
				disabled={page === 1}
				onClick={() => {
					setPage(1), setLoading(true)
				}}
			>
				В начало
			</Button>
			<Button
				disabled={page === 1}
				onClick={() => {
					setPage(page - 1), setLoading(true)
				}}
			>
				Предыдущая
			</Button>
			<div className='current-page'>Страница: {page}</div>
			<Button
				disabled={page === lastPage}
				onClick={() => {
					setPage(page + 1), setLoading(true)
				}}
			>
				Следующая
			</Button>
			<Button
				disabled={page === lastPage}
				onClick={() => {
					setPage(lastPage), setLoading(true)
				}}
			>
				В конец
			</Button>
		</div>
	)
}

export const Pagination = s(PaginationContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
	margin: 20px 0 0 0;

	& .current-page {
		font-weight: bold;
		border: 1px solid #5e5e5e;
		border-radius: 10px;
		padding: 5px 10px;
		font-size: 20px;
		text-align: center;
	}

	& button {
		padding: 5px 10px;
		font-weight: bold;
		width: auto;
		height: 42px;
	}
`

PaginationContainer.propTypes = {
	className: PropTypes.string.isRequired,
	page: PropTypes.number.isRequired,
	lastPage: PropTypes.number.isRequired,
	setPage: PropTypes.func.isRequired,
	setLoading: PropTypes.func.isRequired,
}
