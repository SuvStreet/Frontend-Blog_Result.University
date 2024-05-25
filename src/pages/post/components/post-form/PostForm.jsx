import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import PropTypes from 'prop-types'

import { Icon, Input } from '../../../../components'
import { SpecialPanel } from '../special-panel/SpecialPanel'
import { sanitizeContent } from './utils'
import { useServerRequest } from '../../../../hooks'
import { savePostAsync } from '../../../../actions'

import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons'
import s from 'styled-components'

const PostFormContainer = ({
	className,
	post: { id, title, imgUrl, content, publishedAt },
}) => {
	const imgRef = useRef(null)
	const titleRef = useRef(null)
	const contentRef = useRef(null)
	const requestServer = useServerRequest()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const onSave = () => {
		const newImgUrl = imgRef.current.value
		const newTitle = titleRef.current.value
		const newContent = sanitizeContent(contentRef.current.innerHTML)

		if(newImgUrl === imgUrl && newTitle === title && newContent === content) {
			navigate(`/post/${id}`)
			return
		}

		dispatch(
			savePostAsync(requestServer, {
				id,
				imgUrl: newImgUrl,
				title: newTitle,
				content: newContent,
			}),
		).then(() => {
			navigate(`/post/${id}`)
		})
	}

	return (
		<div className={className}>
			<Input ref={imgRef} defaultValue={imgUrl} placeholder='Ссылка на изображение' />
			<Input ref={titleRef} defaultValue={title} placeholder='Заголовок' />

			<SpecialPanel
				post={{ id, publishedAt }}
				editButton={
					<Icon
						fontSize='1.3rem'
						iconCode={faFloppyDisk}
						margin='0 20px 0 0'
						onClick={() => onSave()}
					/>
				}
			/>

			<div
				ref={contentRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
				className='post-text'
			>
				{content}
			</div>
		</div>
	)
}

export const PostForm = s(PostFormContainer)`
	& .post-text {
		font-size: 20px;
		white-space: pre-wrap;
		border: 1px solid #5e5e5e;
		border-radius: 10px;
		padding: 10px;


	}
`

PostFormContainer.propTypes = {
	className: PropTypes.string,
	post: PropTypes.object,
}
