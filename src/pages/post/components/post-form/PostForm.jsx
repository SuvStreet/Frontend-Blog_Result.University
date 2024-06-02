import { useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import PropTypes from 'prop-types'

import { PrivateContent, H2, Icon, Input } from '../../../../components'
import { SpecialPanel } from '../special-panel/SpecialPanel'
import { sanitizeContent } from './utils'
import { useServerRequest } from '../../../../hooks'
import { savePostAsync } from '../../../../actions'
import { selectUserRole } from '../../../../selectors'
import { ERROR, ROLE } from '../../../../constants'

import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons'
import s from 'styled-components'

const PostFormContainer = ({
	className,
	post: { id, title, imgUrl, content, publishedAt },
}) => {
	const [imgUrlValue, setImgUrlValue] = useState(imgUrl)
	const [titleValue, setTitleValue] = useState(title)
	const [errorMessage, setErrorMessage] = useState(null)
	const [contentRefIsEmpty, setContentRefIsEmpty] = useState(true)
	const contentRef = useRef(null)
	const requestServer = useServerRequest()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const userRole = useSelector(selectUserRole)

	useLayoutEffect(() => {
		if (userRole !== ROLE.ADMIN) {
			setErrorMessage(ERROR.NO_ACCESS)
			return
		}

		setImgUrlValue(imgUrl)
		setTitleValue(title)
	}, [title, imgUrl, userRole])

	const onInputContentRefChange = ({ target: { innerText } }) =>
		innerText === '' ? setContentRefIsEmpty(true) : setContentRefIsEmpty(false)

	const onSave = () => {
		const newContent = sanitizeContent(contentRef.current.innerHTML)

		if (!imgUrlValue || !titleValue || !newContent) {
			return
		}

		if (imgUrlValue === imgUrl && titleValue === title && newContent === content) {
			navigate(`/post/${id}`)
			return
		}

		dispatch(
			savePostAsync(requestServer, {
				id,
				imgUrl: imgUrlValue,
				title: titleValue,
				content: newContent,
			}),
		).then(({ id }) => {
			navigate(`/post/${id}`)
		})
	}

	const onImgChange = ({ target: { value } }) => setImgUrlValue(value)

	const onTitleChange = ({ target: { value } }) => setTitleValue(value)

	return (
		<div className={className}>
			<PrivateContent serverError={errorMessage}>
				<H2>Создание статьи</H2>
				<Input
					value={imgUrlValue}
					onChange={onImgChange}
					placeholder='Ссылка на изображение...'
				/>
				<Input value={titleValue} onChange={onTitleChange} placeholder='Заголовок...' />

				<SpecialPanel
					post={{ id, publishedAt }}
					editButton={
						<Icon fontSize='1.3rem' iconCode={faFloppyDisk} onClick={() => onSave()} />
					}
				/>

				<div
					ref={contentRef}
					contentEditable={true}
					suppressContentEditableWarning={true}
					data-placeholder='Текст статьи...'
					onInput={onInputContentRefChange}
					className={'post-text ' + (contentRefIsEmpty && 'empty')}
				>
					{content}
				</div>
			</PrivateContent>
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
		position: relative;
	}

	& .post-text.empty::before {
		content: attr(data-placeholder);
		position: absolute;
		top: 10px;
		left: 10px;
		color: #6d6d6d;
		pointer-events: none;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	h2 {
		text-align: center;
	}
`

PostFormContainer.propTypes = {
	className: PropTypes.string,
	post: PropTypes.object,
}
