import PropTypes from 'prop-types'

import { H2, Icon } from '../../../../components'

import {
	faCalendarDays,
	faTrashCan,
	faPenToSquare,
} from '@fortawesome/free-solid-svg-icons'
import s from 'styled-components'

const PostContentContainer = ({
	className,
	post: { id, title, imgUrl, content, publishedAt },
}) => {
	return (
		<div className={className}>
			<img src={imgUrl} alt={title} />
			<H2>{title}</H2>
			<div className='special-panel'>
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
					<Icon fontSize='1.3rem' iconCode={faPenToSquare} margin='0 20px 0 0' />
					<Icon
						fontSize='1.3rem'
						iconCode={faTrashCan}
						onClick={() => console.log(id)}
					/>
				</div>
			</div>
			<div className='post-text'>{content}</div>
		</div>
	)
}

export const PostContent = s(PostContentContainer)`
	& img {
		float: left;
		margin: 0 20px 10px 0;
	}

	& .special-panel {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: -20px 0 20px;
		font-size: 20px;
	}

	& .published-at {
		display: flex;
		align-items: center;
	}

	& .buttons {
		display: flex;
		align-items: center;
	}

	& .post-text {
		font-size: 20px;
	}
`

PostContentContainer.propTypes = {
	className: PropTypes.string,
	post: PropTypes.object,
}
