import PropsTypes from 'prop-types'

import { Icon } from '../../../../../../components'

import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
import { faCalendarDays, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import s from 'styled-components'

const CommentContainer = ({ className, id, author, content, publishedAt }) => {
	return (
		<div className={className}>
			<div className='comment'>
				<div className='information-panel'>
					<div className='author'>
						<Icon
							fontSize='1.3rem'
							iconCode={faCircleUser}
							margin="0 10px 0 0"
							cursor='default'
							onClick={() => console.log()}
						/>
						{author}
					</div>
					<div className='published-at'>
						<Icon
							fontSize='1.3rem'
							iconCode={faCalendarDays}
							margin='0 10px 0 0'
							cursor='default'
							onClick={() => console.log()}
						/>
						{publishedAt}
					</div>
				</div>
				<div className='comment-text'>
					<div className='content'>{content}</div>
				</div>
			</div>

			<Icon
				fontSize='1.3rem'
				iconCode={faTrashCan}
				onClick={() => console.log(id)}
				margin='0 0 0 20px'
			/>
		</div>
	)
}

export const Comment = s(CommentContainer)`
	display: flex;
	justify-content: space-between;
	margin-top: 10px;

	& .comment {
		border: 1px solid #ccc;
		border-radius: 10px;
		padding: 10px;
		width: 100%;
	}

	& .information-panel {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	& .author {
		display: flex;
		align-items: center;
	}

	& .published-at {
		display: flex;
		align-items: center;
	}
`

CommentContainer.propTypes = {
	className: PropsTypes.string,
	id: PropsTypes.number,
	author: PropsTypes.string,
	content: PropsTypes.string,
	publishedAt: PropsTypes.string,
}
