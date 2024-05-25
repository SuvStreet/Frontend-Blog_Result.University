import PropTypes from 'prop-types'

import { Icon } from '../../../../components'

import { faCalendarDays, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import s from 'styled-components'

const SpecialPanelContainer = ({ className, post: { id, publishedAt }, editButton }) => {
	return (
		<div className={className}>
			<div className='published-at'>
				<Icon
					fontSize='1.2rem'
					iconCode={faCalendarDays}
					margin='0 10px 0 0'
					cursor='default'
				/>
				{publishedAt}
			</div>
			<div className='buttons'>
				{editButton}
				<Icon fontSize='1.3rem' iconCode={faTrashCan} onClick={() => console.log(id)} />
			</div>
		</div>
	)
}

export const SpecialPanel = s(SpecialPanelContainer)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: ${({ margin }) => margin || '0 0 20px'};
	font-size: 20px;

	& .published-at {
		display: flex;
		align-items: center;
	}

	& .buttons {
		display: flex;
		align-items: center;
	}
`

SpecialPanelContainer.propTypes = {
	className: PropTypes.string,
	post: PropTypes.object,
	editButton: PropTypes.node,
}
