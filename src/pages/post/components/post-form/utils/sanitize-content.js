export const sanitizeContent = (content) => {
	return content
		.replaceAll('<div><br></div>', '\n')
		.replaceAll('<div>', '\n')
		.replaceAll('</div>', '')
		.replaceAll('&nbsp;', ' ')
		.replaceAll('<br>', '')
}
