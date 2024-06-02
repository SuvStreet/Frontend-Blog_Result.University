import PropsType from 'prop-types'

import { Icon } from '../icon/Icon'

import {
	fa0,
	fa4,
	faFaceFrownOpen,
	faGear,
	faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons'
import s from 'styled-components'

const ErrorContainer = ({ className, error, ...props }) => {
	const { spin, noAccess, noDataSearch, pageNotFound } = props

	return (
		error && (
			<div className={className}>
				{spin && (
					<>
						<Icon
							fontSize='4rem'
							margin='0 auto 0 calc(50% - 3rem)'
							iconCode={faGear}
							cursor='default'
							spin
						/>
						<Icon
							fontSize='3rem'
							margin='-5px auto 0'
							iconCode={faGear}
							cursor='default'
							spin
							spinReverse
						/>
					</>
				)}

				{noAccess && (
					<>
						<Icon
							fontSize='3rem'
							margin='20px auto 0'
							iconCode={faTriangleExclamation}
							cursor='default'
							bounce
						/>
					</>
				)}

				{noDataSearch && (
					<Icon
						fontSize='3rem'
						margin='20px 0 0 0'
						iconCode={faFaceFrownOpen}
						cursor='default'
					/>
				)}

				{pageNotFound && (
					<div className='page-not-found'>
						<Icon
							fontSize='3rem'
							margin='20px 0 0 0'
							iconCode={fa4}
							cursor='default'
							bounce
						/>
						<Icon
							fontSize='3rem'
							margin='20px 10px 0 10px'
							iconCode={fa0}
							cursor='default'
							bounce
						/>
						<Icon
							fontSize='3rem'
							margin='20px 0 0 0'
							iconCode={fa4}
							cursor='default'
							bounce
						/>
					</div>
				)}

				<div className='error-message'>{error}</div>
			</div>
		)
	)
}

export const Error = s(ErrorContainer)`
	display: flex;
	flex-direction: column;
	justify-content: center;

	& .error-message {
		font-size: 20px;
		font-weight: bold;
		text-align: center;
		margin-top: 20px;
	}

	& .page-not-found {
		display: flex;
		justify-content: center;
		align-items: center;
	}
`

ErrorContainer.propTypes = {
	className: PropsType.string,
	error: PropsType.string,
	spin: PropsType.bool,
	noAccess: PropsType.bool,
	noDataSearch: PropsType.bool,
	pageNotFound: PropsType.bool,
}
