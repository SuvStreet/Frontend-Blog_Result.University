import { Icon, Input } from '../../../../components'

import PropTypes from 'prop-types'

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import s from 'styled-components'

const SearchContainer = ({ className, onChange, searchPhrase }) => {
	return (
		<div className={className}>
			<Input
				value={searchPhrase}
				onChange={onChange}
				placeholder='Поиск постов...'
				width='520px'
			/>
			<Icon fontSize='1.7rem' iconCode={faMagnifyingGlass} cursor='default' />
		</div>
	)
}

export const Search = s(SearchContainer)`
	display: flex;
	align-items: center;
	position: relative;

	& input {
		margin: 0;
		padding-right: 45px;
	}

	& svg {
		position: absolute;
		right: 10px;
		color: #5e5e5e;

		&:hover {
			cursor: text;
		}
	}

	& input:focus + svg {
		color: #fff;
	}
`

SearchContainer.propTypes = {
	className: PropTypes.string,
	onChange: PropTypes.func,
	searchPhrase: PropTypes.string,
}
